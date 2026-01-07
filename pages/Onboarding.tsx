import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

type AgeGroup = "0-6" | "7-12" | "13-17" | "18+";

export default function Onboarding() {
  const [step, setStep] = useState<"age" | "complete">("age");
  const [selectedAge, setSelectedAge] = useState<AgeGroup | null>(null);
  const navigate = useNavigate();

  const ageGroups: AgeGroup[] = ["0-6", "7-12", "13-17", "18+"];

  const handleAgeSelect = (age: AgeGroup) => {
    setSelectedAge(age);
  };

  const handleContinue = () => {
    if (selectedAge) {
      localStorage.setItem("userAge", selectedAge);
      setStep("complete");
    }
  };

  const handleStart = () => {
    navigate("/");
  };

  if (step === "complete") {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-6">
        <Card className="max-w-md w-full p-8 text-center space-y-6 animate-scale-in">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Sparkles className="w-12 h-12 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Bereit zum Lernen?</h1>
            <p className="text-muted-foreground">
              Entdecke Themen, die dich wirklich interessieren. Lerne in deinem eigenen Tempo.
            </p>
          </div>
          <Button onClick={handleStart} size="lg" className="w-full gradient-primary text-white border-0">
            Los geht's! 🚀
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-6">
      <Card className="max-w-md w-full p-8 space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Willkommen!</h1>
          <p className="text-muted-foreground">
            Wie alt bist du?
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {ageGroups.map((age) => (
            <button
              key={age}
              onClick={() => handleAgeSelect(age)}
              className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                selectedAge === age
                  ? "border-primary bg-primary/5 scale-105"
                  : "border-border hover:border-primary/50 hover:bg-secondary"
              }`}
            >
              <span className="text-2xl font-bold">{age}</span>
            </button>
          ))}
        </div>

        <Button
          onClick={handleContinue}
          disabled={!selectedAge}
          size="lg"
          className="w-full gradient-primary text-white border-0"
        >
          Weiter
        </Button>
      </Card>
    </div>
  );
}
