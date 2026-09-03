
import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudentSkills from "./pages/StudentSkills";
import CareerSelection from "./pages/CareerSelection";
import SkillGap from "./pages/SkillGap";
import LearningResources from "./pages/LearningResources";
import LearningRoadmap from "./pages/LearningRoadmap";
import LearningProgress from "./pages/LearningProgress";
import AIRecommendation from "./pages/AIRecommendation";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>

      {/* First Page - Registration */}
      <Route path="/" element={<Register />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Registration */}
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Student Skills */}
      <Route path="/skills" element={<StudentSkills />} />

      {/* Career Selection */}
      <Route path="/career" element={<CareerSelection />} />

      {/* Skill Gap */}
      <Route path="/skill-gap" element={<SkillGap />} />

      {/* Learning Resources */}
      <Route
        path="/learning-resources"
        element={<LearningResources />}
      />

      {/* Learning Roadmap */}
      <Route
        path="/learning-roadmap"
        element={<LearningRoadmap />}
      />

      {/* Learning Progress */}
      <Route
        path="/learning-progress"
        element={<LearningProgress />}
      />

      {/* AI Recommendation */}
      <Route
        path="/ai-recommendation"
        element={<AIRecommendation />}
      />

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;

