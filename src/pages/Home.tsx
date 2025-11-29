import { useNavigate, useLocation } from "react-router-dom";
import { TopicCard } from "@/components/TopicCard";
import { BottomNav } from "@/components/BottomNav";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Calculator,
  Sprout,
  Palette,
  Atom,
  Landmark,
  Radio,
  Globe,
  Languages,
  Brain,
  Dumbbell,
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const [topicProgress, setTopicProgress] = useState<Record<string, number>>(
    {}
  );
  const [animateNavElephant, setAnimateNavElephant] = useState(false);

  const topics = [
    {
      id: "medienkritik",
      title: "Medienkritik",
      icon: Radio,
      color: "bg-topic-media text-white",
    },
    {
      id: "geografie",
      title: "Geografie",
      icon: Globe,
      color: "bg-topic-geography text-white",
    },
    {
      id: "klimawandel",
      title: "Klimawandel",
      icon: Sprout,
      color: "bg-topic-nature text-white",
    },
    {
      id: "math",
      title: "Mathematik",
      icon: Calculator,
      color: "bg-topic-math text-white",
    },
    {
      id: "art",
      title: "Kunst",
      icon: Palette,
      color: "bg-topic-art text-foreground",
    },
    {
      id: "nature",
      title: "Nawi",
      icon: Atom,
      color: "bg-topic-science text-white",
    },
    {
      id: "history",
      title: "Geschichte",
      icon: Landmark,
      color: "bg-topic-history text-white",
    },
    {
      id: "language",
      title: "Sprachen",
      icon: Languages,
      color: "bg-accent text-foreground",
    },
    {
      id: "ai",
      title: "KI & Technologie",
      icon: Brain,
      color: "bg-[#9333EA] text-white",
    },
    {
      id: "sport",
      title: "Sport",
      icon: Dumbbell,
      color: "bg-[#EF4444] text-white",
    },
  ];

  // Fortschritt pro Thema laden
  useEffect(() => {
    const loadTopicProgress = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setTopicProgress({});
          return;
        }

        const { data: progressData, error } = await supabase
          .from("level_progress")
          .select("topic_id, level_id")
          .eq("user_id", user.id);

        if (error) throw error;

        const levelsByTopic: Record<string, number> = {};
        progressData?.forEach((p) => {
          if (!levelsByTopic[p.topic_id]) {
            levelsByTopic[p.topic_id] = 0;
          }
          levelsByTopic[p.topic_id]++;
        });

        setTopicProgress(levelsByTopic);
      } catch (error) {
        console.error("Error loading topic progress:", error);
      }
    };

    loadTopicProgress();
  }, []);

  // Elefant-Animation, wenn man gerade vom Login kommt
  useEffect(() => {
    const state = location.state as { fromAuth?: boolean } | null;

    if (state?.fromAuth) {
      setAnimateNavElephant(true);

      const timer = setTimeout(() => {
        setAnimateNavElephant(false);
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="min-h-screen pb-24 gradient-hero">
      <div className="max-w-md mx-auto p-6 space-y-8">
        {/* Header */}
        <header className="animate-fade-in space-y-2 text-center">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight">
            elevate
          </h1>
          <p className="text-sm text-muted-foreground">
            Wähle ein Thema und starte deine Sprünge.
          </p>
        </header>

        {/* Themen-Grid */}
        <section>
          <div
            className="grid grid-cols-2 gap-4 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            {topics.map((topic, index) => (
              <div
                key={topic.id}
                className="animate-fade-in"
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                <TopicCard
                  title={topic.title}
                  icon={topic.icon}
                  color={topic.color}
                  completedLevels={topicProgress[topic.id] || 0}
                  totalLevels={10}
                  // WICHTIG: jetzt richtige Route zur Roadmap
                  onClick={() => navigate(`/topic/${topic.id}`)}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNav animateProfileElephant={animateNavElephant} />
    </div>
  );
}
