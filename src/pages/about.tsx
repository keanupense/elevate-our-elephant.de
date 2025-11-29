import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pb-24 gradient-hero">
      <div className="max-w-md mx-auto p-6 space-y-8">
        {/* Header – nur elevate + sehr kurzer Text */}
        <header className="animate-fade-in space-y-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight">
            elevate
          </h1>
          <p className="text-sm text-muted-foreground">
            Ein Elefant, der mit dir springt – kleine Lernhäppchen für deinen Alltag.
          </p>
        </header>

        {/* Mini-About, wirklich kurz */}
        <section className="animate-fade-in space-y-3 text-sm leading-relaxed text-foreground">
          <p>
            elevate ist ein persönliches Side-Projekt. Eine kleine Lern-App, die eher wie ein Spiel
            als wie Schule funktionieren soll – mit Sprüngen, Streaks und Themen, auf die du Bock hast.
          </p>
        </section>

        {/* Support / Spenden – sehr knapp & clean */}
        <section className="animate-fade-in space-y-4 text-sm leading-relaxed text-foreground">
          <h2 className="text-base font-semibold">
            Entwicklung & Instandhaltung unterstützen
          </h2>
          <p>
            Wenn du möchtest, kannst du die Weiterentwicklung von elevate (Hosting, Pflege, neue Inhalte)
            mit einer kleinen Spende unterstützen.
          </p>

          {/* PayPal / Revolut – clean nebeneinander */}
          <div className="flex gap-3">
            <Button
              asChild
              className="flex-1 text-xs flex items-center justify-center gap-1"
            >
              <a
                href="https://paypal.me/keanupense"
                target="_blank"
                rel="noopener noreferrer"
              >
                PayPal
                <ArrowRight className="w-3 h-3" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 text-xs flex items-center justify-center gap-1"
            >
              <a
                href="https://revolut.me/kpense"
                target="_blank"
                rel="noopener noreferrer"
              >
                Revolut
                <ArrowRight className="w-3 h-3" />
              </a>
            </Button>
          </div>

          {/* IBAN – schlicht drunter */}
          <div className="space-y-1 pt-1">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Banküberweisung
            </p>
            <p className="text-xs text-muted-foreground">Kontoinhaber: Keanu Pense</p>
            <p className="text-xs text-muted-foreground">IBAN:</p>
            <p className="font-mono text-sm">
              DE15 1005 0000 1070 5034 24
            </p>
          </div>
        </section>
      </div>

      <BottomNav animateProfileElephant={false} />
    </div>
  );
}
