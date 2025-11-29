// Hinweis: Diese Datenschutzerklärung ist eine vereinfachte Vorlage für ein Lernprojekt
// und ersetzt keine individuelle Rechtsberatung. Bitte passe sie an deine tatsächlichen
// Datenflüsse an und lass sie im Zweifel juristisch prüfen.

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Datenschutz() {
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
          <h1 className="text-2xl font-extrabold tracking-tight">
            Datenschutzerklärung
          </h1>

          <section className="space-y-1 text-sm leading-relaxed">
            <h2 className="font-semibold">1. Verantwortliche Stelle</h2>
            <p>Keanu Rahiem Pense</p>
            <p>Herthastr., 1d</p>
            <p>14193 Berlin</p>
            <p>Deutschland</p>
            <p className="mt-2">
              keanu.pense04@gmail.com: <span className="underline">keanu.pense04@gmail.com</span>
            </p>
          </section>

          <section className="space-y-1 text-sm leading-relaxed">
            <h2 className="font-semibold mt-4">2. Zweck der Verarbeitung</h2>
            <p>
              Die App <strong>elevate</strong> dient als Lernplattform mit kurzen
              Übungs-Einheiten („Levels“). Zur Bereitstellung der Funktionen werden
              personenbezogene Daten verarbeitet – insbesondere, um:
            </p>
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>Nutzerkonten anzulegen und Logins zu ermöglichen,</li>
              <li>Lernfortschritt und „Sprünge“ zu speichern,</li>
              <li>die App technisch bereitzustellen und zu verbessern.</li>
            </ul>
          </section>

          <section className="space-y-1 text-sm leading-relaxed">
            <h2 className="font-semibold mt-4">3. Verarbeitete Daten</h2>
            <p>Je nach Nutzung werden insbesondere folgende Daten verarbeitet:</p>
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>
                <strong>Login-Daten:</strong> E-Mail-Adresse und Passwort (Passwort nur als
                Hash über unseren Auth-Dienst Supabase).
              </li>
              <li>
                <strong>Nutzungsdaten:</strong> absolvierte Levels, Punkte / XP,
                Lernstatistiken (z.&nbsp;B. Streak, bevorzugte Themen).
              </li>
              <li>
                <strong>Technische Daten:</strong> IP-Adresse, Browsertyp, Datum und Uhrzeit
                des Zugriffs (Server-Logs beim Hosting-Anbieter).
              </li>
            </ul>
          </section>

          <section className="space-y-1 text-sm leading-relaxed">
            <h2 className="font-semibold mt-4">4. Rechtsgrundlagen</h2>
            <p>
              Die Verarbeitung deiner Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
              DSGVO (Vertragserfüllung – Nutzung der App) und Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an einer sicheren, stabilen und verbesserten App).
            </p>
          </section>

          <section className="space-y-1 text-sm leading-relaxed">
            <h2 className="font-semibold mt-4">5. Einsatz von Supabase</h2>
            <p>
              Für Authentifizierung und Datenspeicherung nutzen wir den Dienstleister{" "}
              <strong>Supabase</strong> (Supabase Inc.). Supabase verarbeitet Daten in
              unserem Auftrag. Es gelten zusätzlich die Datenschutzbestimmungen von Supabase.
            </p>
          </section>

          <section className="space-y-1 text-sm leading-relaxed">
            <h2 className="font-semibold mt-4">6. Local Storage & Cookies</h2>
            <p>
              Bestimmte Informationen wie dein Lernfortschritt oder UI-Einstellungen können
              lokal im Browser (Local Storage) gespeichert werden. Diese Daten verlassen dein
              Gerät nicht und dienen ausschließlich dazu, deine Nutzung angenehmer zu machen.
            </p>
          </section>

          <section className="space-y-1 text-sm leading-relaxed">
            <h2 className="font-semibold mt-4">7. Speicherdauer</h2>
            <p>
              Wir speichern deine Daten nur so lange, wie es für die Nutzung der App
              erforderlich ist. Wenn du dein Nutzerkonto löschen möchtest, kannst du dich an
              die oben genannte Kontaktadresse wenden. Server-Logs werden in der Regel
              automatisch nach einer kurzen Frist (z.&nbsp;B. 7–30 Tage) gelöscht.
            </p>
          </section>

          <section className="space-y-1 text-sm leading-relaxed">
            <h2 className="font-semibold mt-4">8. Weitergabe von Daten</h2>
            <p>
              Eine Weitergabe deiner Daten an Dritte erfolgt grundsätzlich nur,
              wenn dies:
            </p>
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>zur Erfüllung vertraglicher Pflichten notwendig ist,</li>
              <li>aufgrund gesetzlicher Verpflichtungen erforderlich ist oder</li>
              <li>auf deiner ausdrücklichen Einwilligung beruht.</li>
            </ul>
          </section>

          <section className="space-y-1 text-sm leading-relaxed">
            <h2 className="font-semibold mt-4">9. Deine Rechte</h2>
            <p>
              Du hast gemäß DSGVO insbesondere folgende Rechte hinsichtlich deiner
              personenbezogenen Daten:
            </p>
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
            </ul>
            <p className="mt-1">
              Hierzu sowie zu weiteren Fragen zum Thema Datenschutz kannst du dich jederzeit
              an die oben genannte Kontaktadresse wenden.
            </p>
          </section>

          <section className="space-y-1 text-sm leading-relaxed">
            <h2 className="font-semibold mt-4">10. Beschwerderecht</h2>
            <p>
              Wenn du der Ansicht bist, dass die Verarbeitung deiner personenbezogenen
              Daten gegen das Datenschutzrecht verstößt, hast du das Recht, dich bei einer
              Aufsichtsbehörde zu beschweren (Art. 77 DSGVO).
            </p>
          </section>

          <p className="text-xs text-muted-foreground mt-4">
            Hinweis: Diese Datenschutzerklärung ist eine Vorlage und muss vor
            Veröffentlichung auf deine konkrete technische Umsetzung und deinen Hosting-Anbieter
            angepasst werden.
          </p>
        </Card>
      </div>
    </div>
  );
}
