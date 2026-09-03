import { useEffect, useState } from "react";
import api from "../services/api";


function SkillGap() {
  const [skillGap, setSkillGap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSkillGap();
  }, []);

  const loadSkillGap = async () => {
    try {
      setLoading(true);
      setError("");

      const careerId = localStorage.getItem("selectedCareerId");

      if (!careerId) {
        setError("Please select a career first.");
        return;
      }

      const response = await api.get(
        `/api/student/skill-gap/${careerId}`
      );

      setSkillGap(response.data);

    } catch (err) {
      console.error(err);
      setError("Failed to load skill gap.");
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
            Analyzing your skills...
          </p>

          <p className="text-sm text-slate-500 mt-2">
            Comparing your skills with your career requirements
          </p>

        </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

        <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-slate-900 p-8 shadow-2xl text-center">

          <div className="w-14 h-14 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-2xl">
            ⚠️
          </div>

          <h2 className="text-xl font-bold text-white mt-5">
            Something went wrong
          </h2>

          <p className="text-red-300 mt-3">
            {error}
          </p>

        </div>

      </div>
    );
  }

  const percentage = Math.min(
    Math.max(skillGap?.matchPercentage || 0, 0),
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
            Skill Gap Analysis
          </h1>

          <p className="text-slate-400 mt-2">
            See how your current skills match your selected career.
          </p>

        </div>

        {/* Career Card */}
        <div className="rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-slate-900 to-purple-500/10 p-7 shadow-2xl mb-6">

          <div className="flex items-center gap-5">

            <div className="w-14 h-14 shrink-0 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl">
              🎯
            </div>

            <div>
              <p className="text-xs font-semibold tracking-widest text-indigo-400">
                SELECTED CAREER
              </p>

              <h2 className="text-2xl font-bold text-white mt-1">
                {skillGap?.career}
              </h2>
            </div>

          </div>

        </div>

        {/* Match Percentage */}
        <div className="rounded-3xl border border-purple-500/20 bg-slate-900 p-7 shadow-2xl mb-6">

          <div className="flex flex-col sm:flex-row sm:items-center gap-7">

            <div className="min-w-[170px]">

              <p className="text-sm font-semibold text-purple-400">
                SKILL MATCH
              </p>

              <div className="text-5xl font-extrabold mt-2">
                {percentage}%
              </div>

            </div>

            <div className="flex-1">

              <div className="flex justify-between mb-3">

                <span className="text-sm text-slate-500">
                  Career compatibility
                </span>

                <span className="text-sm font-semibold text-slate-300">
                  {percentage}%
                </span>

              </div>

              <div className="w-full h-4 rounded-full bg-slate-800 overflow-hidden">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>

        {/* Missing Skills */}
        <div className="rounded-3xl border border-red-500/20 bg-slate-900 p-7 shadow-2xl mb-6">

          <div className="flex items-center gap-4 mb-6">

            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xl">
              ⚠️
            </div>

            <div>

              <h2 className="text-xl font-bold">
                Missing Skills
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Skills you need to learn for your selected career.
              </p>

            </div>

          </div>

          {skillGap?.missingSkills?.length > 0 ? (

            <div className="flex flex-wrap gap-3">

              {skillGap.missingSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 font-medium hover:bg-red-500/15 transition"
                >
                  {skill}
                </span>
              ))}

            </div>

          ) : (

            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5">
              <p className="text-emerald-300 font-medium">
                ✓ No missing skills 🎉
              </p>
            </div>

          )}

        </div>

        {/* Weak Skills */}
        <div className="rounded-3xl border border-yellow-500/20 bg-slate-900 p-7 shadow-2xl">

          <div className="flex items-center gap-4 mb-6">

            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-xl">
              📉
            </div>

            <div>

              <h2 className="text-xl font-bold">
                Weak Skills
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Skills that need more improvement.
              </p>

            </div>

          </div>

          {skillGap?.weakSkills?.length > 0 ? (

            <div className="flex flex-wrap gap-3">

              {skillGap.weakSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 font-medium hover:bg-yellow-500/15 transition"
                >
                  {skill}
                </span>
              ))}

            </div>

          ) : (

            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5">
              <p className="text-emerald-300 font-medium">
                ✓ No weak skills 🎉
              </p>
            </div>

          )}

        </div>

     

      </div>

    </div>
  );
}

export default SkillGap;