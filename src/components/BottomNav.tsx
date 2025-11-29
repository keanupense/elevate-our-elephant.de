import { NavLink } from "react-router-dom";
import { Home, Info } from "lucide-react";
import elephantIcon from "@/assets/elephant-icon.png";
import { cn } from "@/lib/utils";

type BottomNavProps = {
  animateProfileElephant?: boolean;
};

export const BottomNav = ({ animateProfileElephant }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
        {/* Themen / Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-2xl transition-colors",
              isActive
                ? "text-primary bg-secondary"
                : "text-muted-foreground hover:text-foreground"
            )
          }
        >
          <Home className="w-5 h-5" />
          <span className="text-xs font-medium">Themen</span>
        </NavLink>

        {/* Profil mit Elefant */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-2xl transition-colors",
              isActive
                ? "text-primary bg-secondary"
                : "text-muted-foreground hover:text-foreground"
            )
          }
        >
          <div className="w-7 h-7 flex items-center justify-center overflow-visible">
            <img
              src={elephantIcon}
              alt="Profil-Elefant"
              className={cn(
                "w-7 h-7",
                animateProfileElephant && "elephant-nav-landing"
              )}
            />
          </div>
          <span className="text-xs font-medium">Profil</span>
        </NavLink>

        {/* About */}
        <NavLink
          to="/about"
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-2xl transition-colors",
              isActive
                ? "text-primary bg-secondary"
                : "text-muted-foreground hover:text-foreground"
            )
          }
        >
          <Info className="w-5 h-5" />
          <span className="text-xs font-medium">Über uns</span>
        </NavLink>
      </div>
    </nav>
  );
};
