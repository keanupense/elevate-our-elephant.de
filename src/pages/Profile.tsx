import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import {
  Flame,
  CalendarDays,
  LogOut,
  User2,
  Settings2,
  UserPlus,
  MessageCircle,
  Phone,
} from "lucide-react";
import elephantIcon from "@/assets/elephant-icon.png";

type StreakDay = {
  dateKey: string; // "YYYY-MM-DD"
  label: string;   // "Mo", "Di", ...
  isToday: boolean;
  hasActivity: boolean;
};

type TopicMeta = {
  id: string;
  title: string;
};

const TOPIC_META: TopicMeta[] = [
  { id: "medienkritik", title: "Medienkritik" },
  { id: "geografie", title: "Geografie" },
  { id: "klimawandel", title: "Klimawandel" },
  { id: "math", title: "Mathematik" },
  { id: "art", title: "Kunst" },
  { id: "nature", title: "Naturwissenschaft" },
  { id: "history", title: "Geschichte" },
  { id: "language", title: "Sprachen" },
  { id: "ai", title: "KI & Technologie" },
  { id: "sport", title: "Sport" },
];

export default function Profile() {
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState<string>("");
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [streakDays, setStreakDays] = useState<StreakDay[]>([]);
  const [totalCompletions, setTotalCompletions] = useState(0);
  const [favoriteTopics, setFavoriteTopics] = useState<
    { id: string; title: string; count: number }[]
  >([]);

  // Elefanten-State für Klick-Animation
  const [elephantClicks, setElephantClicks] = useState(0);
  const [elephantBounceClass, setElephantBounceClass] = useState<string | null>(
    null
  );

  const formatDateKey = (d: Date) => {
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const weekdayShort = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

  // ---------- Daten laden ----------
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        const user = userData.user;
        if (!user) {
          navigate("/auth");
          return;
        }

        // Name aus Metadata oder E-Mail ableiten
        const metaName = (user.user_metadata as any)?.name as
          | string
          | undefined;
        const fallbackName =
          metaName || user.email?.split("@")[0] || "Elevate Nutzer:in";
        setDisplayName(fallbackName);

        // Fortschritt laden
        const { data: progressData, error: progressError } = await supabase
          .from("level_progress")
          .select("id, created_at, topic_id")
          .eq("user_id", user.id)
          .order("created_at", { ascending: true });

        if (progressError) throw progressError;

        const completions = progressData ?? [];
        setTotalCompletions(completions.length);

        const activityByDate = new Map<string, number>();
        const topicCounts = new Map<string, number>();

        completions.forEach((item: any) => {
          const created = item.created_at
            ? new Date(item.created_at as string)
            : null;
          if (!created) return;

          const key = formatDateKey(created);
          activityByDate.set(key, (activityByDate.get(key) ?? 0) + 1);

          if (item.topic_id) {
            topicCounts.set(
              item.topic_id,
              (topicCounts.get(item.topic_id) ?? 0) + 1
            );
          }
        });

        // aktueller Streak
        const today = new Date();
        const todayKey = formatDateKey(today);
        let streak = 0;

        let cursor = new Date(
          activityByDate.has(todayKey)
            ? today
            : new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() - 1
              )
        );

        while (true) {
          const key = formatDateKey(cursor);
          if (!activityByDate.has(key)) break;
          streak++;
          cursor = new Date(
            cursor.getFullYear(),
            cursor.getMonth(),
            cursor.getDate() - 1
          );
        }

        setCurrentStreak(streak);

        // längster Streak
        if (completions.length > 0) {
          const firstDate = new Date(completions[0].created_at as string);
          const allStreakDates = new Set(activityByDate.keys());
          let longest = 0;
          let cur = 0;

          const iterDate = new Date(
            firstDate.getFullYear(),
            firstDate.getMonth(),
            firstDate.getDate()
          );
          const endDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
          );

          while (iterDate <= endDate) {
            const key = formatDateKey(iterDate);
            if (allStreakDates.has(key)) {
              cur++;
              if (cur > longest) longest = cur;
            } else {
              cur = 0;
            }
            iterDate.setDate(iterDate.getDate() + 1);
          }

          setLongestStreak(longest);
        } else {
          setLongestStreak(0);
        }

        // Streak-Kalender (letzte 7 Tage)
        const days: StreakDay[] = [];
        const daysBack = 7;
        for (let i = daysBack - 1; i >= 0; i--) {
          const d = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - i
          );
          const key = formatDateKey(d);
          days.push({
            dateKey: key,
            label: weekdayShort[d.getDay()],
            isToday: key === todayKey,
            hasActivity: activityByDate.has(key),
          });
        }
        setStreakDays(days);

        // Lieblingsthemen (Top 3)
        const fav: { id: string; title: string; count: number }[] = [];
        topicCounts.forEach((count, id) => {
          const meta = TOPIC_META.find((t) => t.id === id);
          if (!meta) return;
          fav.push({ id, title: meta.title, count });
        });
        fav.sort((a, b) => b.count - a.count);
        setFavoriteTopics(fav.slice(0, 3));
      } catch (err) {
        console.error("Fehler beim Laden des Profils:", err);
      }
    };

    loadProfile();
  }, [navigate]);

  // Realtime: neuer Level -> neu laden
  useEffect(() => {
    const setupRealtime = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const channel = supabase
        .channel("level_progress_changes")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "level_progress",
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            window.location.reload();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };

    setupRealtime();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleOpenSettings = () => {
    navigate("/settings");
  };

  // Klick-Limit für den Elefanten (abhängig vom Streak)
  const maxElephantClicks =
    currentStreak <= 0 ? 1 : currentStreak === 1 ? 2 : 3;

  const handleElephantClick = () => {
    if (elephantClicks >= maxElephantClicks) return;

    const next = elephantClicks + 1;
    setElephantClicks(next);

    let cls = "elephant-bounce-1";
    if (next === 2) cls = "elephant-bounce-2";
    if (next >= 3) cls = "elephant-bounce-3";
    setElephantBounceClass(cls);

    setTimeout(() => setElephantBounceClass(null), 800);
  };

  // Invite-Funktionen
  const createShareText = () => {
    const url = window.location.origin;
    return `Lern mit mir kleine Sachen in elevate 📚🐘\n\nKomm rein: ${url}`;
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(createShareText());
    const link = `https://wa.me/?text=${text}`;
    window.open(link, "_blank");
  };

  const handleShareSMS = () => {
    const text = encodeURIComponent(createShareText());
    const link = `sms:?&body=${text}`;
    window.location.href = link;
  };

  const totalDaysPlayed = streakDays.filter((d) => d.hasActivity).length;

  return (
    <div className="min-h-screen pb-24 gradient-hero">
      <div className="max-w-md mx-auto p-6 space-y-7">
        {/* Header */}
        <header className="animate-fade-in space-y-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight">
            Profil
          </h1>
        </header>

        {/* Name + Settings */}
        <section className="animate-fade-in">
          <Card className="rounded-3xl border-0 shadow-[var(--shadow-card)] bg-white/90">
            <div className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                  <User2 className="w-5 h-5" />
                </div>
                <p className="text-base font-semibold truncate max-w-[180px]">
                  {displayName}
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenSettings}
                className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <Settings2 className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </Card>
        </section>

        {/* Streak + Kalender + Elefant */}
        <section className="space-y-4 animate-fade-in">
          <Card className="rounded-3xl border-0 shadow-[var(--shadow-card)] bg-white/90">
            <div className="p-4 flex gap-4">
              {/* Elefant an der Seite */}
              <button
                type="button"
                onClick={handleElephantClick}
                className="flex flex-col items-center justify-between gap-1 w-16"
              >
                <div className="w-full flex items-end justify-center h-16">
                  <img
                    src={elephantIcon}
                    alt="Streak-Elefant"
                    className={`w-10 h-10 ${elephantBounceClass ?? ""}`}
                  />
                </div>
                <p className="text-[0.6rem] text-muted-foreground text-center leading-tight">
                  Klicks: {maxElephantClicks - elephantClicks}
                </p>
              </button>

              {/* Streak-Infos + 7-Tage-Kalender */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-semibold">Streak</span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold leading-none">
                      {currentStreak}
                    </p>
                    <p className="text-[0.7rem] text-muted-foreground">
                      Best: {longestStreak}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="w-4 h-4" />
                    <span>Letzte 7 Tage</span>
                  </div>
                  <div className="flex justify-between gap-1">
                    {streakDays.map((day) => (
                      <div
                        key={day.dateKey}
                        className="flex flex-col items-center gap-1 flex-1"
                      >
                        <div
                          className={[
                            "w-full h-5 rounded-full border text-[0.7rem] flex items-center justify-center",
                            day.hasActivity
                              ? "bg-emerald-500/90 border-emerald-500 text-white"
                              : "bg-slate-100 border-slate-200 text-slate-400",
                            day.isToday
                              ? "ring-2 ring-emerald-400 ring-offset-2 ring-offset-white"
                              : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          {day.hasActivity ? "✓" : ""}
                        </div>
                        <span className="text-[0.65rem] text-muted-foreground">
                          {day.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Sprünge + Top-Themen – größer */}
        <section className="space-y-4 animate-fade-in">
          <Card className="rounded-3xl border-0 shadow-[var(--shadow-card)] bg-white/90">
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    sprünge insgesamt
                  </p>
                  <p className="text-3xl font-extrabold leading-none mt-1">
                    {totalCompletions}
                  </p>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <p>Aktive Tage</p>
                  <p className="text-base font-semibold">{totalDaysPlayed}</p>
                </div>
              </div>

              {favoriteTopics.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    top-themen
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {favoriteTopics.map((topic) => (
                      <span
                        key={topic.id}
                        className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold"
                      >
                        {topic.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </section>

        {/* Freunde einladen – WhatsApp & Nachrichten */}
        <section className="space-y-4 animate-fade-in">
          <Card className="rounded-3xl border-0 shadow-[var(--shadow-card)] bg-white/90">
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-emerald-600" />
                <p className="text-sm font-semibold">Freunde einladen</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Teile elevate, damit ihr zusammen eure Streaks hochhaltet.
              </p>
              <div className="flex gap-3">
                <Button
                  type="button"
                  className="flex-1 text-xs flex items-center justify-center gap-1"
                  onClick={handleShareWhatsApp}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 text-xs flex items-center justify-center gap-1"
                  onClick={handleShareSMS}
                >
                  <Phone className="w-4 h-4" />
                  Nachrichten
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Logout */}
        <section className="animate-fade-in">
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-3 h-3 mr-1.5" />
              Abmelden
            </Button>
          </div>
        </section>
      </div>

      <BottomNav animateProfileElephant={false} />
    </div>
  );
}
