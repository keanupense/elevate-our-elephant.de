import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export const TopNav = () => {
  const navItems = [
    { label: "Topics", path: "/" },
    { label: "Profile", path: "/profile" },
    { label: "About & Donations", path: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
        <span className="text-[0.65rem] tracking-[0.35em] uppercase text-muted-foreground">
          Elevate our Elephant
        </span>

        <div className="flex gap-4 text-[0.65rem] uppercase tracking-[0.25em]">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "pb-0.5 border-b border-transparent hover:border-foreground/40 transition-colors",
                  isActive ? "border-foreground text-foreground" : "text-muted-foreground"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
