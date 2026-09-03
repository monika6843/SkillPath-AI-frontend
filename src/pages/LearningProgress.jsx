import { useEffect, useState } from "react";
import api from "../services/api";


function LearningProgress() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/api/student/roadmap/progress"
      );

      setProgress(response.data);

    } catch (err) {
      console.error(
        "Error fetching learning progress:",
        err
      );

      setError(
        "Unable to load your learning progress."
      );

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 mx-auto mb-5 rounded-2xl border-2 border-indigo-500/30 border-t-indigo-400 animate-spin"></div>

          <p className="text-lg text-slate-300">
            Loading your learning progress...
          </p>

        </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

        <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-slate-900 p-8 shadow-2xl text-center">

          <div className="text-3xl mb-4">
            ⚠️
          </div>

          <p className="text-red-300 mb-5">
            {error}
          </p>

          <button
            onClick={fetchProgress}
            className="rounded-xl bg-indigo-600 text-white px-6 py-3 font-semibold hover:bg-indigo-700 transition"
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }

  if (!progress) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">

        <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 text-center">

          <p className="text-slate-400">
            No progress data available.
          </p>

        </div>

      </div>
    );
  }

  const percentage = Math.min(
    Math.max(progress.progressPercentage || 0, 0),
    100
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white px-5 py-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-semibold tracking-[0.2em] text-indigo-400">
            SKILLPATH AI
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            Learning Progress
          </h1>

          <p className="text-slate-400 mt-2">
            Track your progress on your personalized learning roadmap.
          </p>

        </div>

        {/* Overall Progress */}
        <div className="rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-slate-900 to-purple-500/10 p-7 shadow-2xl mb-7">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-5">

            <div>

              <p className="text-sm font-semibold text-indigo-400 tracking-wider">
                OVERALL ROADMAP
              </p>

              <h2 className="text-2xl font-bold mt-1">
                Your Learning Progress
              </h2>

            </div>

            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              {percentage.toFixed(1)}%
            </div>

          </div>

          <div className="w-full h-5 rounded-full bg-slate-800 overflow-hidden">

            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

          <p className="text-sm text-slate-500 mt-3">
            Keep learning and complete your roadmap step by step.
          </p>

        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Total */}
          <div className="rounded-3xl border border-indigo-500/20 bg-slate-900 p-6 shadow-xl hover:-translate-y-1 transition">

            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl">
              📚
            </div>

            <p className="text-slate-500 text-sm mt-5">
              Total Skills
            </p>

            <h2 className="text-4xl font-bold text-white mt-2">
              {progress.totalItems}
            </h2>

          </div>

          {/* Completed */}
          <div className="rounded-3xl border border-emerald-500/20 bg-slate-900 p-6 shadow-xl hover:-translate-y-1 transition">

            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-2xl">
              ✓
            </div>

            <p className="text-slate-500 text-sm mt-5">
              Completed
            </p>

            <h2 className="text-4xl font-bold text-emerald-400 mt-2">
              {progress.completedItems}
            </h2>

          </div>

          {/* In Progress */}
          <div className="rounded-3xl border border-yellow-500/20 bg-slate-900 p-6 shadow-xl hover:-translate-y-1 transition">

            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-2xl">
              ⏳
            </div>

            <p className="text-slate-500 text-sm mt-5">
              In Progress
            </p>

            <h2 className="text-4xl font-bold text-yellow-400 mt-2">
              {progress.inProgressItems}
            </h2>

          </div>

          {/* Not Started */}
          <div className="rounded-3xl border border-red-500/20 bg-slate-900 p-6 shadow-xl hover:-translate-y-1 transition">

            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-2xl">
              ○
            </div>

            <p className="text-slate-500 text-sm mt-5">
              Not Started
            </p>

            <h2 className="text-4xl font-bold text-red-400 mt-2">
              {progress.notStartedItems}
            </h2>

          </div>

        </div>

        

      </div>

    </div>
  );
}

export default LearningProgress;

