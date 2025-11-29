import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import elephantIcon from "@/assets/elephant-icon.png";

type TopicId =
  | "medienkritik"
  | "geografie"
  | "klimawandel"
  | "math"
  | "art"
  | "nature"
  | "history"
  | "language"
  | "ai"
  | "sport"
  | string;

type LevelBubble = {
  id: string; // "1"..."10"
  title: string;
};

const TOPIC_TITLES: Record<string, string> = {
  medienkritik: "Medienkritik",
  geografie: "Geografie",
  klimawandel: "Klimawandel",
  math: "Mathematik",
  art: "Kunst",
  nature: "Naturwissenschaft",
  history: "Geschichte",
  language: "Sprachen",
  ai: "KI & Technologie",
  sport: "Sport",
};

const LEVELS: LevelBubble[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  title: `Level ${i + 1}`,
}));

const LOADING_MESSAGES = [
  "Let’s jump in.",
  "Bereit für den nächsten Sprung?",
  "Sprung für Sprung – los geht’s.",
  "Kleiner Jump, großer Kopf.",
  "Ein Sprung näher am nächsten Aha-Moment.",
];

const PATH_OFFSETS = [-40, -20, 0, 20, 40, 30, 10, -10, -30, -40];

export default function Roadmap() {
  const { topicId } = useParams<{ topicId: TopicId }>();
  const navigate = useNavigate();

  const topicTitle = (topicId && TOPIC_TITLES[topicId]) || "Thema";

  const [introMessage, setIntroMessage] = useState<string>("");
  const [showIntro, setShowIntro] = useState(true);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  // Intro + Fortschritt aus localStorage laden
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * LOADING_MESSAGES.length);
    setIntroMessage(LOADING_MESSAGES[randomIndex]);

    if (topicId) {
      const key = `elevate_${topicId}_completed_ids`;
      const stored = window.localStorage.getItem(key);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as string[];
          setCompletedIds(parsed);
        } catch {
          setCompletedIds([]);
        }
      } else {
        setCompletedIds([]);
      }
    }

    const timer = setTimeout(() => setShowIntro(false), 1100);
    return () => clearTimeout(timer);
  }, [topicId]);

  const handleBack = () => {
    navigate("/");
  };

  const handleLevelClick = (index: number, level: LevelBubble) => {
    const prevLevel = LEVELS[index - 1];
    const prevDone =
      index === 0 || (prevLevel && completedIds.includes(prevLevel.id));
    const alreadyDone = completedIds.includes(level.id);

    // nur anklickbar, wenn erstes Level oder vorheriges geschafft
    if (!prevDone && !alreadyDone) return;

    // KEIN sofortiges "completed" mehr – passiert erst nach dem Quiz
    navigate(`/topic/${topicId || "medienkritik"}/level/${index + 1}`);
  };

  // erstes noch nicht erledigtes Level
  const currentIndex = LEVELS.findIndex(
    (lvl) => !completedIds.includes(lvl.id)
  );
  const activeIndex = currentIndex === -1 ? LEVELS.length - 1 : currentIndex;

  // Farben: erledigt = grün, aktuelles = lila, Rest = orange
  const bubbleColorClasses = (index: number) => {
    const levelId = LEVELS[index].id;

    if (completedIds.includes(levelId)) {
      return "bg-emerald-500 border-emerald-500"; // done
    }
    if (index === activeIndex) {
      return "bg-purple-500 border-purple-500 animate-pulse"; // current
    }
    if (index > activeIndex) {
      return "bg-orange-400 border-orange-400"; // future
    }
    return "bg-slate-200 border-slate-300";
  };

  const isIntroVisible = showIntro;

  return (
    <div className="min-h-screen pb-24 gradient-hero">
      <div className="max-w-md mx-auto p-6 space-y-6">
        <header className="flex items-center gap-3 animate-fade-in">
          <button
            type="button"
            onClick={handleBack}
            className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <span className="text-sm font-bold text-slate-700">←</span>
          </button>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Thema
            </span>
            <h1 className="text-xl font-extrabold leading-tight tracking-tight">
              {topicTitle}
            </h1>
          </div>
        </header>

        {isIntroVisible ? (
          <section className="animate-fade-in">
            <div className="min-h-[260px] flex flex-col items-center justify-center gap-4">
              <img
                src={elephantIcon}
                alt="Lade Elefant"
                className="w-16 h-16 elephant-loading-bounce"
              />
              <p className="text-sm font-medium text-muted-foreground text-center px-6">
                {introMessage}
              </p>
            </div>
          </section>
        ) : (
          <section className="space-y-4 animate-fade-in">
            <Card className="rounded-3xl border-0 shadow-[var(--shadow-card)] bg-sky-500 text-white">
              <div className="p-4 space-y-1">
                <p className="text-[0.65rem] uppercase tracking-[0.18em] opacity-90">
                  Stufe 1 · Abschnitt{" "}
                  {Math.min((completedIds.length || 0) + 1, LEVELS.length)}
                </p>
                <p className="text-sm font-semibold">
                  Sprung für Sprung durch dein Thema.
                </p>
              </div>
            </Card>

            <div className="mt-4 flex flex-col gap-6">
              {LEVELS.map((level, index) => {
                const xOffset = PATH_OFFSETS[index] ?? 0;
                const colorClasses = bubbleColorClasses(index);

                const prevLevel = LEVELS[index - 1];
                const prevDone =
                  index === 0 ||
                  (prevLevel && completedIds.includes(prevLevel.id));
                const alreadyDone = completedIds.includes(level.id);
                const isClickable = prevDone || alreadyDone;

                return (
                  <div
                    key={level.id}
                    className="flex justify-center"
                    style={{ transform: `translateX(${xOffset}px)` }}
                  >
                    <button
                      type="button"
                      onClick={() => handleLevelClick(index, level)}
                      className={`flex flex-col items-center gap-1 focus:outline-none ${
                        isClickable
                          ? "cursor-pointer"
                          : "cursor-not-allowed opacity-60"
                      }`}
                    >
                      <div
                        className={[
                          "w-16 h-16 rounded-full border-2 shadow-md flex items-center justify-center",
                          colorClasses,
                        ].join(" ")}
                      >
                        <span className="text-lg font-bold text-white">
                          {index + 1}
                        </span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <BottomNav animateProfileElephant={false} />
    </div>
  );
}
