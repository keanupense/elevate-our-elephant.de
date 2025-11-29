import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import elephantIcon from "@/assets/elephant-icon.png";

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-3xl bg-white/90 shadow-[var(--shadow-card)] flex items-center justify-center">
              <img
                src={elephantIcon}
                alt="Elephant"
                className="w-16 h-16 elephant-bounce"
              />
            </div>

            <div className="absolute -right-4 -top-3 bg-white shadow-md rounded-2xl px-3 py-2 text-xs font-semibold">
              I want to jump more!
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Solve more mini-quests so I can keep bouncing.
          </p>
          <p className="text-xs text-muted-foreground/80">
            We&apos;re getting your topics ready…
          </p>
        </div>
      </div>
    </div>
  );
}
