import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type TopicCardProps = {
  title: string;
  icon: LucideIcon;
  color: string; // z.B. "bg-topic-media text-white"
  completedLevels: number;
  totalLevels: number;
  onClick: () => void;
};

export const TopicCard = ({
  title,
  icon: Icon,
  color,
  completedLevels,
  totalLevels,
  onClick,
}: TopicCardProps) => {
  const progress =
    totalLevels > 0 ? Math.min(100, (completedLevels / totalLevels) * 100) : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-3xl"
    >
      <Card
        className={`rounded-3xl border-0 shadow-[var(--shadow-card)] overflow-hidden ${color} h-32`}
      >
        <div className="h-full p-5 flex flex-col justify-between">
          {/* Icon + Titel */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shadow-sm">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-base font-semibold leading-snug">
              {title}
            </span>
          </div>

          {/* Progress-Streifen */}
          <div className="mt-3">
            <div className="h-1.5 rounded-full bg-white/25 overflow-hidden">
              <div
                className="h-full rounded-full bg-white/90"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </Card>
    </button>
  );
};
