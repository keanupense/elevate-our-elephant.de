import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./integrations/supabase/client";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Roadmap from "./pages/Roadmap";
import TopicDetail from "./pages/TopicDetail";
import Settings from "./pages/Settings";
import About from "./pages/about";
import Onboarding from "./pages/Onboarding";
import Loading from "./pages/Loading";
import NotFound from "./pages/NotFound";
import impressum from "./pages/impressum";
import Datenschutz from "./pages/Datenschutz";

function RequireAuth({ session }: { session: Session | null }) {
  if (!session) {
    return <Navigate to="/auth" replace />;
  }
  return <Outlet />;
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setAuthChecked(true);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  if (!authChecked) {
    return <Loading />;
  }

  return (
    <Routes>
      {/* öffentlich */}
      <Route path="/auth" element={<Auth />} />
      <Route path="/impressum" element={<Impressum />} />
      <Route path="/datenschutz" element={<Datenschutz />} />

      {/* alles ab hier nur mit Login */}
      <Route element={<RequireAuth session={session} />}>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />

        {/* Lernpfad + Level */}
        <Route path="/topic/:topicId" element={<Roadmap />} />
        <Route path="/topic/:topicId/level/:levelId" element={<TopicDetail />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
