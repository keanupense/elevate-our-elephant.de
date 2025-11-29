import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import elephantIcon from "@/assets/elephant-icon.png";
import { cn } from "@/lib/utils";

type Mode = "login" | "register";

export default function Auth() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>("login");
  const [showIntro, setShowIntro] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);

    try {
      if (mode === "register") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }

      // Nach Login: Home mit Info, dass wir von Auth kommen (für Nav-Elefant)
      navigate("/", { state: { fromAuth: true } });
    } catch (error: any) {
      console.error("Auth error:", error);
      setAuthError(error.message || "Etwas ist schiefgelaufen. Bitte versuch es nochmal.");
    } finally {
      setLoading(false);
    }
  };

  const titleText = mode === "login" ? "Anmelden" : "Konto erstellen";

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 w-full">
        <div className="space-y-10">
          {/* Intro: nur der Elefant, 2 Sprünge nach oben, wird kleiner */}
          {showIntro && (
            <div className="h-56 flex items-center justify-center overflow-visible">
              <img
                src={elephantIcon}
                alt="Elefant"
                className="w-32 h-32 elephant-intro"
                onAnimationEnd={() => setShowIntro(false)}
              />
            </div>
          )}

          {/* Login/Signup – erst nach Intro */}
          {!showIntro && (
            <div className="space-y-6 animate-fade-in">
              {/* Branding-Header, clean */}
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="text-sm font-extrabold uppercase tracking-[0.25em] text-emerald-700">
                  elevate
                </span>
                <h1 className="text-2xl font-extrabold text-foreground leading-tight">
                  Lerne kleine Dinge,
                  <br />
                  einen Sprung nach dem anderen.
                </h1>
              </div>

              {/* Mode Switch */}
              <div className="flex items-center justify-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={cn(
                    "px-3 py-1 rounded-full border text-xs uppercase tracking-[0.15em]",
                    mode === "login"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-muted-foreground border-border"
                  )}
                >
                  Anmelden
                </button>
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className={cn(
                    "px-3 py-1 rounded-full border text-xs uppercase tracking-[0.15em]",
                    mode === "register"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-muted-foreground border-border"
                  )}
                >
                  Registrieren
                </button>
              </div>

              {/* Formular */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="E-Mail"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 text-sm"
                  />
                  <Input
                    type="password"
                    placeholder="Passwort"
                    autoComplete={
                      mode === "register" ? "new-password" : "current-password"
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-10 text-sm"
                  />
                </div>

                {authError && (
                  <p className="text-xs text-destructive">{authError}</p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-10 text-xs uppercase tracking-[0.2em]"
                >
                  {loading ? "Bitte warten..." : titleText}
                </Button>
              </form>

              <p className="text-[0.7rem] text-center text-muted-foreground">
                Nutze später dieselbe E-Mail, um dich wieder anzumelden und deine Sprünge zu behalten.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
