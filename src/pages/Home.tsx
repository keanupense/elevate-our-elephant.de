import { useNavigate } from "react-router-dom";
import { TopicCard } from "@/components/TopicCard";
import { BottomNav } from "@/components/BottomNav";
import { useState, useEffect } from "react";
import { getCompletedLevelIds } from "@/lib/progressStorage";
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

const TOPICS = [
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

export default function Home() {
  const navigate = useNavigate();

  const [topicProgress, setTopicProgress] = useState<Record<string, number>>(
    {}
  );

  // Fortschritt pro Thema laden
  useEffect(() => {
    const levelsByTopic: Record<string, number> = {};
    TOPICS.forEach((topic) => {
      levelsByTopic[topic.id] = getCompletedLevelIds(topic.id).length;
    });
    setTopicProgress(levelsByTopic);
  }, []);

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
            {TOPICS.map((topic, index) => (
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

      <BottomNav />
    </div>
  );
}
