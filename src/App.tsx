import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Roadmap from "./pages/Roadmap";
import TopicDetail from "./pages/TopicDetail";
import Settings from "./pages/Settings";
import About from "./pages/about";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import Impressum from "./pages/impressum";
import Datenschutz from "./pages/Datenschutz";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Start / Hauptapp – jetzt ohne Login */}
      <Route path="/" element={<Home />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/about" element={<About />} />

      {/* Lernpfad + Level – für alle frei zugänglich */}
      <Route path="/topic/:topicId" element={<Roadmap />} />
      <Route
        path="/topic/:topicId/level/:levelId"
        element={<TopicDetail />}
      />

      {/* Rechtliches */}
      <Route path="/impressum" element={<Impressum />} />
      <Route path="/datenschutz" element={<Datenschutz />} />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;