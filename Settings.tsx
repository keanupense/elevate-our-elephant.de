import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Shield, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 gradient-hero">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="px-0 gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Einstellungen</span>
          </Button>
        </div>

        {/* Rechtliches */}
        <Card className="p-4 space-y-3 rounded-3xl border-0 shadow-[var(--shadow-card)] bg-white/90 animate-fade-in">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Rechtliches
          </p>

          <Button
            variant="ghost"
            className="w-full justify-between px-2 py-3 rounded-2xl hover:bg-slate-50"
            onClick={() => navigate("/datenschutz")}
          >
            <span className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Datenschutz</span>
            </span>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-between px-2 py-3 rounded-2xl hover:bg-slate-50"
            onClick={() => navigate("/Impressum")}
          >
            <span className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Impressum</span>
            </span>
          </Button>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          elevate – kleine Sprünge, echtes Lernen.
        </p>
      </div>
    </div>
  );
}
