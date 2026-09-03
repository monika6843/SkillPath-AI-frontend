import { useEffect, useState } from "react";
import api from "../services/api";
function LearningResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError("");

      const careerId =
        localStorage.getItem("selectedCareerId");

      if (!careerId) {
        setError("Please select a career first.");
        return;
      }

      const response = await api.get(
        `/api/learning-resources/recommended/${careerId}`
      );

      setResources(response.data);

    } catch (err) {
      console.error(
        "Error fetching learning resources:",
        err
      );

      setError(
        "Unable to load recommended learning resources."
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
            Loading learning resources...
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
            onClick={fetchResources}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 transition"
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-5 py-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-semibold tracking-[0.2em] text-indigo-400">
            SKILLPATH AI
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            Learning Resources
          </h1>

          <p className="text-slate-400 mt-2">
            Recommended resources based on your career and skill gap.
          </p>

        </div>

        {/* No Resources */}
        {resources.length === 0 ? (

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-10 text-center shadow-2xl">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/10 flex items-center justify-center text-3xl">
              📚
            </div>

            <h2 className="text-xl font-bold mt-5">
              No Resources Available
            </h2>

            <p className="text-slate-500 mt-2">
              No recommended learning resources are available yet.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {resources.map((resource, index) => (

              <div
                key={resource.id}
                className="group rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/30 hover:shadow-indigo-500/10"
              >

                {/* Number */}
                <div className="flex items-center justify-between mb-5">

                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex gap-2">

                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                      {resource.type}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                      {resource.level}
                    </span>

                  </div>

                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-white leading-snug">
                  {resource.title}
                </h2>

                {/* Skill */}
                <p className="text-sm text-indigo-400 font-semibold mt-3">
                  Skill: {resource.skillName}
                </p>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-6 mt-4 min-h-[72px]">
                  {resource.description}
                </p>

                {/* Button */}
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block text-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
                >
                  Open Resource →
                </a>

              </div>

            ))}

          </div>

        )}

    

      </div>

    </div>
  );
}

export default LearningResources;

