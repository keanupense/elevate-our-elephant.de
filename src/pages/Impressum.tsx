// Hinweis: Dieses Impressum ist eine allgemeine Vorlage und ersetzt keine individuelle Rechtsberatung.
// Bitte trage deine echte Anschrift und Kontakt-E-Mail ein und lass den Text im Zweifel juristisch prüfen.

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Impressum() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 gradient-hero">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <header className="flex items-center gap-3 mb-2">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="px-0 gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Zurück</span>
          </Button>
        </header>

        <Card className="p-6 rounded-3xl border-0 shadow-[var(--shadow-card)] bg-white/90 space-y-4">
          <h1 className="text-2xl font-extrabold tracking-tight">Impressum</h1>

          <section className="space-y-1 text-sm leading-relaxed">
            <h2 className="font-semibold">Angaben gemäß § 5 TMG</h2>
            <p>Keanu Rahiem Pense</p>
            <p>Herthastr., 1d</p>
            <p>14193 Berlin</p>
            <p>Deutschland</p>
            <p className="mt-2">
              E-Mail: <span className="underline">keanu.pense04@gmail.com </span>
            </p>
          </section>

          <section className="space-y-1 text-sm leading-relaxed">
            <h2 className="font-semibold mt-4">Verantwortlich für den Inhalt nach § 18 MStV</h2>
            <p>Keanu Rahiem Pense</p>
            <p>Herthastr., 1d</p>
            <p>14193 Berlin</p>
          </section>

          <section className="space-y-1 text-sm leading-relaxed">
            <h2 className="font-semibold mt-4">Art des Angebots</h2>
            <p>
              <strong>elevate</strong> ist ein nicht-kommerzielles Lernprojekt. Die Plattform
              bietet kurze Lernübungen zu unterschiedlichen Themen wie Medienkritik,
              Mathematik oder Geschichte. Das Angebot richtet sich vor allem an Schüler*innen,
              Studierende und andere Lernende.
            </p>
          </section>

          <section className="space-y-1 text-sm leading-relaxed">
            <h2 className="font-semibold mt-4">Haftung für Inhalte</h2>
            <p>
              Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die
              Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann ich jedoch keine
              Gewähr übernehmen. Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
              §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet,
              übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>

          <section className="space-y-1 text-sm leading-relaxed">
            <h2 className="font-semibold mt-4">Haftung für Links</h2>
            <p>
              Soweit diese Website Links zu externen Websites Dritter enthält, habe ich auf
              deren Inhalte keinen Einfluss. Deshalb kann ich für diese fremden Inhalte auch
              keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der
              jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Rechtswidrige
              Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
          </section>

          <section className="space-y-1 text-sm leading-relaxed">
            <h2 className="font-semibold mt-4">Urheberrecht</h2>
            <p>
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              (Texte, Grafiken, Illustrationen, Layout) unterliegen dem deutschen
              Urheberrecht. Jede Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechts bedarf der schriftlichen
              Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>

          <p className="text-xs text-muted-foreground mt-4">
            Hinweis: Dieses Impressum wurde mit Unterstützung einer KI-Vorlage erstellt und
            sollte vor Veröffentlichung geprüft und bei Bedarf an die tatsächlichen
            rechtlichen Rahmenbedingungen angepasst werden.
          </p>
        </Card>
      </div>
    </div>
  );
}
