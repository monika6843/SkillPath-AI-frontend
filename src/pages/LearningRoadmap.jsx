
import { useEffect, useState } from "react";
import api from "../services/api";

function LearningRoadmap() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("=================================");
    console.log("LEARNING ROADMAP PAGE LOADED");
    console.log("=================================");

    console.log(
      "LOCAL STORAGE CAREER ID =",
      localStorage.getItem("selectedCareerId")
    );

    console.log(
      "LOCAL STORAGE CAREER NAME =",
      localStorage.getItem("selectedCareerName")
    );

    fetchRoadmap();
  }, []);

  // =====================================================
  // FETCH MY ROADMAP
  // =====================================================

  const fetchRoadmap = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("");
      console.log("=================================");
      console.log("FETCHING MY ROADMAP");
      console.log("=================================");

      console.log(
        "REQUEST URL = /api/student/roadmap"
      );

      const response =
        await api.get("/api/student/roadmap");

      console.log("");
      console.log(
        "ROADMAP GET API FULL RESPONSE =",
        response
      );

      console.log(
        "ROADMAP GET RESPONSE DATA =",
        response.data
      );

      console.log("");
      console.log(
        "========== GET ROADMAP CAREER =========="
      );

      console.log(
        "GET ROADMAP ID =",
        response.data?.roadmapId
      );

      console.log(
        "GET ROADMAP CAREER ID =",
        response.data?.careerId
      );

      console.log(
        "GET ROADMAP CAREER NAME =",
        response.data?.careerName
      );

      console.log("");
      console.log(
        "========== GET ROADMAP ITEMS =========="
      );

      console.log(
        "GET ROADMAP ITEMS =",
        response.data?.items
      );

      console.log(
        "GET ROADMAP ITEMS COUNT =",
        response.data?.items?.length
      );

      if (response.data?.items) {
        response.data.items.forEach(
          (item, index) => {

            console.log(
              `GET ITEM ${index + 1} =`,
              item
            );

            console.log(
              `GET ITEM ${index + 1} SKILL ID =`,
              item.skillId
            );

            console.log(
              `GET ITEM ${index + 1} SKILL NAME =`,
              item.skillName
            );

            console.log(
              `GET ITEM ${index + 1} PRIORITY =`,
              item.priority
            );

            console.log(
              `GET ITEM ${index + 1} STATUS =`,
              item.status
            );
          }
        );
      }

      console.log("");
      console.log(
        "========== CAREER COMPARISON =========="
      );

      console.log(
        "LOCAL STORAGE CAREER ID =",
        localStorage.getItem("selectedCareerId")
      );

      console.log(
        "LOCAL STORAGE CAREER NAME =",
        localStorage.getItem("selectedCareerName")
      );

      console.log(
        "BACKEND ROADMAP CAREER ID =",
        response.data?.careerId
      );

      console.log(
        "BACKEND ROADMAP CAREER NAME =",
        response.data?.careerName
      );

      setRoadmap(response.data);

      console.log("");
      console.log(
        "ROADMAP STATE SET SUCCESSFULLY"
      );

      console.log(
        "================================="
      );

    } catch (err) {

      console.error("");
      console.error(
        "================================="
      );

      console.error(
        "ERROR FETCHING ROADMAP"
      );

      console.error(
        "================================="
      );

      console.error(
        "FULL ERROR =",
        err
      );

      console.error(
        "ERROR MESSAGE =",
        err.message
      );

      console.error(
        "ERROR STATUS =",
        err.response?.status
      );

      console.error(
        "ERROR RESPONSE =",
        err.response?.data
      );

      console.error(
        "ERROR URL =",
        err.config?.url
      );

      console.error(
        "================================="
      );

      setError(
        "Unable to load your learning roadmap."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UPDATE ROADMAP ITEM STATUS
  // =====================================================

  const updateStatus = async (
    itemId,
    status
  ) => {

    try {

      console.log("");
      console.log(
        "================================="
      );

      console.log(
        "UPDATING ROADMAP ITEM STATUS"
      );

      console.log(
        "ITEM ID =",
        itemId
      );

      console.log(
        "NEW STATUS =",
        status
      );

      const response =
        await api.put(
          "/api/student/roadmap/items/" +
            itemId +
            "/status",
          {
            status: status,
          }
        );

      console.log(
        "STATUS UPDATE RESPONSE =",
        response.data
      );

      console.log(
        "REFETCHING ROADMAP..."
      );

      await fetchRoadmap();

      console.log(
        "ROADMAP REFRESH COMPLETED"
      );

      console.log(
        "================================="
      );

    } catch (err) {

      console.error(
        "Error updating roadmap status:",
        err
      );

      console.error(
        "ERROR RESPONSE =",
        err.response?.data
      );

      alert(
        "Unable to update roadmap status."
      );
    }
  };

  // =====================================================
  // HELPER FUNCTIONS - UI ONLY
  // =====================================================

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "HIGH":
        return {
          badge:
            "bg-red-500/10 border-red-500/20 text-red-300",
          dot: "bg-red-400",
        };

      case "MEDIUM":
        return {
          badge:
            "bg-amber-500/10 border-amber-500/20 text-amber-300",
          dot: "bg-amber-400",
        };

      case "LOW":
        return {
          badge:
            "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
          dot: "bg-emerald-400",
        };

      default:
        return {
          badge:
            "bg-slate-500/10 border-slate-500/20 text-slate-300",
          dot: "bg-slate-400",
        };
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "COMPLETED":
        return {
          badge:
            "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
          icon: "✓",
        };

      case "IN_PROGRESS":
        return {
          badge:
            "bg-indigo-500/10 border-indigo-500/20 text-indigo-300",
          icon: "◐",
        };

      default:
        return {
          badge:
            "bg-slate-800 border-slate-700 text-slate-400",
          icon: "○",
        };
    }
  };

  const getResourceTheme = (index) => {
    const themes = [
      {
        border: "hover:border-indigo-500/30",
        icon:
          "bg-indigo-500/10 border-indigo-500/20 text-indigo-300",
        tag:
          "bg-indigo-500/10 border-indigo-500/20 text-indigo-300",
        button:
          "from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700",
      },
      {
        border: "hover:border-purple-500/30",
        icon:
          "bg-purple-500/10 border-purple-500/20 text-purple-300",
        tag:
          "bg-purple-500/10 border-purple-500/20 text-purple-300",
        button:
          "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
      },
      {
        border: "hover:border-cyan-500/30",
        icon:
          "bg-cyan-500/10 border-cyan-500/20 text-cyan-300",
        tag:
          "bg-cyan-500/10 border-cyan-500/20 text-cyan-300",
        button:
          "from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700",
      },
      {
        border: "hover:border-pink-500/30",
        icon:
          "bg-pink-500/10 border-pink-500/20 text-pink-300",
        tag:
          "bg-pink-500/10 border-pink-500/20 text-pink-300",
        button:
          "from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600",
      },
    ];

    return themes[index % themes.length];
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

        <div className="text-center">

          <div className="relative w-16 h-16 mx-auto mb-6">

            <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20"></div>

            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin"></div>

            <div className="absolute inset-2 rounded-full bg-slate-900 flex items-center justify-center">

              <span className="text-xl">
                🗺️
              </span>

            </div>

          </div>

          <h2 className="text-xl font-semibold text-white">
            Loading Your Roadmap
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Preparing your personalized learning journey...
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-red-500/20 rounded-3xl shadow-2xl p-8 text-center">

          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">

            <span className="text-2xl">
              ⚠️
            </span>

          </div>

          <h2 className="text-xl font-bold text-white mb-2">
            Roadmap Unavailable
          </h2>

          <p className="text-red-400 text-sm mb-6">
            {error}
          </p>

          <button
            onClick={fetchRoadmap}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-5 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-indigo-500/10"
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }

  // =====================================================
  // NO ROADMAP
  // =====================================================

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">

        <div className="text-center">

          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">

            <span className="text-2xl">
              🗺️
            </span>

          </div>

          <h2 className="text-xl font-bold text-white mb-2">
            No Learning Roadmap Found
          </h2>

          <p className="text-slate-500">
            Select a career to create your personalized roadmap.
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 lg:px-8 py-8">

      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="relative overflow-hidden rounded-3xl mb-8 border border-slate-800 bg-gradient-to-br from-indigo-950/50 via-slate-900 to-purple-950/40 p-7 sm:p-9 shadow-2xl">

          <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>

          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>

          <div className="relative">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-5">

              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>

              <span className="text-xs sm:text-sm font-semibold text-indigo-300">
                PERSONALIZED LEARNING PATH
              </span>

            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

              <div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">

                  My Learning{" "}

                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                    Roadmap
                  </span>

                </h1>

                <p className="text-slate-400 mt-4 max-w-2xl leading-relaxed">
                  Follow your personalized path, improve your skills,
                  and track your progress toward your career goal.
                </p>

              </div>

              {/* Career */}
              <div className="flex-shrink-0">

                <div className="px-5 py-4 rounded-2xl bg-slate-950/50 border border-slate-700/60 backdrop-blur-md">

                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                    Career Goal
                  </p>

                  <p className="text-lg font-bold text-white">
                    {roadmap.careerName}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================= ROADMAP SUMMARY ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/30 transition-all">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <span>🧩</span>
              </div>

              <div>

                <p className="text-xs text-slate-500 uppercase tracking-wider">
                  Total Skills
                </p>

                <p className="text-2xl font-bold text-white">
                  {roadmap.items?.length || 0}
                </p>

              </div>

            </div>

          </div>


          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 hover:border-amber-500/30 transition-all">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <span>🔥</span>
              </div>

              <div>

                <p className="text-xs text-slate-500 uppercase tracking-wider">
                  High Priority
                </p>

                <p className="text-2xl font-bold text-white">
                  {roadmap.items?.filter(
                    (item) => item.priority === "HIGH"
                  ).length || 0}
                </p>

              </div>

            </div>

          </div>


          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-all">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <span>✓</span>
              </div>

              <div>

                <p className="text-xs text-slate-500 uppercase tracking-wider">
                  Completed
                </p>

                <p className="text-2xl font-bold text-white">
                  {roadmap.items?.filter(
                    (item) => item.status === "COMPLETED"
                  ).length || 0}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ================= ROADMAP ITEMS ================= */}

        <div className="space-y-6">

          {roadmap.items &&
          roadmap.items.length > 0 ? (

            roadmap.items.map((item, index) => {

              const priorityStyle =
                getPriorityStyle(item.priority);

              const statusStyle =
                getStatusStyle(item.status);

              return (

                <div
                  key={item.id}
                  className="group relative overflow-hidden bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-xl hover:border-indigo-500/30 transition-all duration-300"
                >

                  {/* Glow */}
                  <div className="absolute -top-24 -right-24 w-56 h-56 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all duration-500"></div>


                  <div className="relative p-6 sm:p-7">

                    {/* ================= TOP ================= */}

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                      {/* Skill */}
                      <div className="flex items-start gap-4">

                        <div className="relative flex-shrink-0">

                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center">

                            <span className="font-bold text-indigo-300">
                              {String(index + 1).padStart(2, "0")}
                            </span>

                          </div>

                          {index <
                            (roadmap.items?.length || 0) - 1 && (
                            <div className="hidden lg:block absolute top-14 left-1/2 w-px h-10 bg-slate-800"></div>
                          )}

                        </div>


                        <div>

                          <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">
                            Skill to Learn
                          </p>

                          <h2 className="text-xl sm:text-2xl font-bold text-white">
                            {item.skillName}
                          </h2>

                          <p className="text-xs text-slate-600 mt-2">
                            Skill ID: {item.skillId}
                          </p>

                        </div>

                      </div>


                      {/* Priority + Status */}
                      <div className="flex flex-col sm:flex-row gap-3">

                        <span
                          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold ${priorityStyle.badge}`}
                        >

                          <span
                            className={`w-2 h-2 rounded-full ${priorityStyle.dot}`}
                          ></span>

                          Priority: {item.priority}

                        </span>


                        <div className="relative">

                          <select
                            value={item.status}
                            onChange={(e) =>
                              updateStatus(
                                item.id,
                                e.target.value
                              )
                            }
                            className="appearance-none w-full sm:w-auto min-w-[160px] border border-slate-700 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium bg-slate-950 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 cursor-pointer"
                          >

                            <option value="NOT_STARTED">
                              NOT STARTED
                            </option>

                            <option value="IN_PROGRESS">
                              IN PROGRESS
                            </option>

                            <option value="COMPLETED">
                              COMPLETED
                            </option>

                          </select>

                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                            ▼
                          </span>

                        </div>

                      </div>

                    </div>


                    {/* ================= STATUS BAR ================= */}

                    <div className="mt-6 flex items-center gap-3">

                      <div
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center ${statusStyle.badge}`}
                      >
                        {statusStyle.icon}
                      </div>

                      <div>

                        <p className="text-xs text-slate-600 uppercase tracking-wider">
                          Current Status
                        </p>

                        <p className="text-sm font-semibold text-slate-300">
                          {item.status?.replace(
                            "_",
                            " "
                          )}
                        </p>

                      </div>

                    </div>


                    {/* ================= RESOURCES ================= */}

                    <div className="mt-7 pt-6 border-t border-slate-800">

                      <div className="flex items-center justify-between mb-5">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                            <span>📚</span>
                          </div>

                          <div>

                            <h3 className="text-lg font-bold text-white">
                              Learning Resources
                            </h3>

                            <p className="text-xs text-slate-600 mt-1">
                              Resources for {item.skillName}
                            </p>

                          </div>

                        </div>

                        <span className="hidden sm:block px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-400">
                          {item.resources?.length || 0} Resources
                        </span>

                      </div>


                      {item.resources &&
                      item.resources.length > 0 ? (

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                          {item.resources.map(
                            (resource, resourceIndex) => {

                              const theme =
                                getResourceTheme(
                                  resourceIndex
                                );

                              return (

                                <div
                                  key={resource.id}
                                  className={`group/resource relative overflow-hidden bg-slate-950/70 border border-slate-800 rounded-2xl p-5 ${theme.border} hover:-translate-y-1 transition-all duration-300`}
                                >

                                  <div className="relative">

                                    {/* Resource Top */}
                                    <div className="flex items-center justify-between mb-5">

                                      <div
                                        className={`w-10 h-10 rounded-xl border flex items-center justify-center ${theme.icon}`}
                                      >

                                        <span>
                                          {resource.type
                                            ?.toLowerCase() ===
                                          "video"
                                            ? "🎥"
                                            : resource.type
                                                ?.toLowerCase() ===
                                              "course"
                                            ? "🎓"
                                            : resource.type
                                                ?.toLowerCase() ===
                                              "article"
                                            ? "📖"
                                            : "📚"}
                                        </span>

                                      </div>


                                      <div className="flex gap-2">

                                        <span
                                          className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${theme.tag}`}
                                        >
                                          {resource.type}
                                        </span>

                                        <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-medium">
                                          {resource.level}
                                        </span>

                                      </div>

                                    </div>


                                    {/* Title */}
                                    <h4 className="font-bold text-white text-base leading-snug mb-3">
                                      {resource.title}
                                    </h4>


                                    {/* Description */}
                                    {resource.description && (
                                      <p className="text-sm text-slate-500 leading-6 mb-5">
                                        {resource.description}
                                      </p>
                                    )}


                                    {/* Open Resource */}
                                    {resource.url && (

                                      <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r ${theme.button} text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300`}
                                      >

                                        Open Resource

                                        <span className="transition-transform duration-200 group-hover/resource:translate-x-1">
                                          →
                                        </span>

                                      </a>

                                    )}

                                  </div>

                                </div>

                              );
                            }
                          )}

                        </div>

                      ) : (

                        <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-5">

                          <p className="text-sm text-slate-500">
                            No learning resources available for this skill.
                          </p>

                        </div>

                      )}

                    </div>

                  </div>

                </div>

              );

            })

          ) : (

            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-xl p-8 text-center">

              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <span className="text-xl">🗺️</span>
              </div>

              <p className="text-slate-400">
                No roadmap items available.
              </p>

            </div>

          )}

        </div>


        {/* ================= BOTTOM INFO ================= */}

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-5 sm:p-6">

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">

            <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">

              <span>
                🚀
              </span>

            </div>

            <div>

              <p className="text-sm font-semibold text-white">
                Build your skills step by step.
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Update each skill's status as you progress through
                your personalized learning roadmap.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
    
  );
}

export default LearningRoadmap;






