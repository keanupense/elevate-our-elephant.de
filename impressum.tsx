import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Impressum() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 gradient-hero">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <header className="flex items-center gap-3 animate-fade-in">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-slate-700" />
          </button>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Infos
            </span>
            <h1 className="text-xl font-extrabold leading-tight tracking-tight">
              Impressum
            </h1>
          </div>
        </header>

        {/* Inhalt */}
        <section className="space-y-4 animate-fade-in">
          <Card className="rounded-3xl border-0 shadow-[var(--shadow-card)] bg-white/90">
            <div className="p-4 space-y-2 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">
                Verantwortlich im Sinne von § 5 TMG
              </p>
              <p>
                Keanu Rahiem Pense
                <br />
                Berlin
              </p>
              <p className="text-[0.75rem] mt-2">
                Hinweis: Trage hier bitte deine vollständige ladungsfähige
                Anschrift und Kontaktmöglichkeiten ein. Dieses Impressum ist
                eine vereinfachte Vorlage für ein Lernprojekt und ersetzt keine
                Rechtsberatung.
              </p>
            </div>
          </Card>

          <div className="flex justify-center">
            <Button
              variant="ghost"
              className="text-xs text-muted-foreground"
              onClick={() => navigate(-1)}
            >
              Zurück zur App
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
