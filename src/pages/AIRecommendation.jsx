import { useState } from "react";
import api from "../services/api";

function AIRecommendation() {
  const [careerId, setCareerId] = useState(1);

  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateRecommendation = async () => {
    try {
      setLoading(true);
      setError("");
      setRecommendation(null);

      const response = await api.post(
        "/api/student/ai/recommendation",
        {
          careerId: careerId,
        }
      );

      setRecommendation(response.data);

    } catch (err) {
      console.error(
        "Error generating AI recommendation:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to generate AI recommendation."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-5 py-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-semibold tracking-[0.2em] text-indigo-400">
            SKILLPATH AI
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            AI Learning Recommendation
          </h1>

          <p className="text-slate-400 mt-2">
            Get personalized learning recommendations based on your
            career and skills.
          </p>

        </div>

        {/* Generate Recommendation */}
        <div className="rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-slate-900 to-purple-500/10 p-7 shadow-2xl mb-6">

          <div className="flex items-center gap-4 mb-6">

            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl">
              🤖
            </div>

            <div>

              <p className="text-xs font-semibold tracking-widest text-indigo-400">
                AI POWERED
              </p>

              <h2 className="text-2xl font-bold mt-1">
                Generate Recommendation
              </h2>

            </div>

          </div>

          <div className="flex flex-col sm:flex-row gap-4">

            <input
              type="number"
              value={careerId}
              onChange={(e) => setCareerId(e.target.value)}
              placeholder="Enter Career ID"
              className="border border-white/10 rounded-xl bg-slate-950/70 px-4 py-3 w-full sm:w-64 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            <button
              onClick={generateRecommendation}
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 font-semibold text-white hover:shadow-lg hover:shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading
                ? "Generating..."
                : "Get AI Recommendation"}
            </button>

          </div>

        </div>

        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 mb-6">

            <p className="text-red-300">
              ⚠️ {error}
            </p>

          </div>
        )}

        {/* Recommendation */}
        {recommendation && (
          <div className="space-y-6">

            {/* Recommendation */}
            <div className="rounded-3xl border border-indigo-500/20 bg-slate-900 p-7 shadow-xl">

              <div className="flex items-center gap-4 mb-5">

                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-xl">
                  💡
                </div>

                <h2 className="text-xl font-bold">
                  AI Recommendation
                </h2>

              </div>

              <p className="text-slate-300 leading-7">
                {recommendation.recommendation}
              </p>

            </div>

            {/* Suggested Order */}
            <div className="rounded-3xl border border-purple-500/20 bg-slate-900 p-7 shadow-xl">

              <div className="flex items-center gap-4 mb-5">

                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-xl">
                  🧭
                </div>

                <h2 className="text-xl font-bold">
                  Suggested Learning Order
                </h2>

              </div>

              <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">

                <p className="text-purple-200 font-medium leading-7">
                  {recommendation.suggestedOrder}
                </p>

              </div>

            </div>

            {/* Reason */}
            <div className="rounded-3xl border border-emerald-500/20 bg-slate-900 p-7 shadow-xl">

              <div className="flex items-center gap-4 mb-5">

                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-xl">
                  ✨
                </div>

                <h2 className="text-xl font-bold">
                  Why This Recommendation?
                </h2>

              </div>

              <p className="text-slate-300 leading-7">
                {recommendation.reason}
              </p>

            </div>

          </div>
        )}

    

      </div>

    </div>
  );
}

export default AIRecommendation;



