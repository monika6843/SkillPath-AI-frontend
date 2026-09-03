
import { useEffect, useState } from "react";
import api from "../services/api";


function CareerSelection() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCareer, setSelectedCareer] = useState("");

  useEffect(() => {
    fetchCareers();
  }, []);

  // =====================================================
  // FETCH ALL CAREERS
  // =====================================================

  const fetchCareers = async () => {
    try {
      console.log("=================================");
      console.log("FETCHING CAREERS...");

      const response = await api.get("/api/careers");

      console.log("CAREERS API RESPONSE =", response.data);

      setCareers(response.data);

    } catch (err) {
      console.error("FETCH CAREERS ERROR =", err);
      console.error(
        "ERROR RESPONSE =",
        err.response?.data
      );
      console.error(
        "ERROR STATUS =",
        err.response?.status
      );

      setError("Failed to load careers");

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SELECT CAREER
  // =====================================================

  const handleSelectCareer = async (career) => {
    try {
      setError("");

      console.log("");
      console.log("=================================");
      console.log("========== CAREER SELECTION ==========");
      console.log("=================================");

      // =====================================================
      // DEBUG 1: SELECTED CAREER OBJECT
      // =====================================================

      console.log(
        "1. SELECTED CAREER OBJECT =",
        career
      );

      console.log(
        "2. SELECTED CAREER ID =",
        career.id
      );

      console.log(
        "3. SELECTED CAREER NAME =",
        career.name
      );

      // =====================================================
      // 1. GET EXISTING STUDENT PROFILE
      // =====================================================

      console.log("");
      console.log(
        "4. GETTING EXISTING STUDENT PROFILE..."
      );

      const profileResponse =
        await api.get("/api/student/profile");

      const profile = profileResponse.data;

      console.log(
        "5. OLD PROFILE =",
        profile
      );

      console.log(
        "6. OLD CAREER GOAL =",
        profile.careerGoal
      );

      // =====================================================
      // 2. UPDATE CAREER IN STUDENT PROFILE
      // =====================================================

      const updatedProfile = {
        college: profile.college,
        degree: profile.degree,
        graduationYear: profile.graduationYear,
        careerGoal: career.name,
        bio: profile.bio,
      };

      console.log("");
      console.log(
        "7. PROFILE UPDATE REQUEST =",
        updatedProfile
      );

      const profileUpdateResponse =
        await api.put(
          "/api/student/profile",
          updatedProfile
        );

      console.log(
        "8. UPDATED PROFILE RESPONSE =",
        profileUpdateResponse.data
      );

      // =====================================================
      // 3. SAVE SELECTED CAREER ID
      // =====================================================

      localStorage.setItem(
        "selectedCareerId",
        career.id
      );

      console.log("");
      console.log(
        "9. SAVED SELECTED CAREER ID =",
        localStorage.getItem("selectedCareerId")
      );

      // =====================================================
      // 4. SAVE SELECTED CAREER NAME
      // =====================================================

      localStorage.setItem(
        "selectedCareerName",
        career.name
      );

      console.log(
        "10. SAVED SELECTED CAREER NAME =",
        localStorage.getItem("selectedCareerName")
      );

      // =====================================================
      // 5. VERIFY LOCAL STORAGE
      // =====================================================

      console.log("");
      console.log(
        "11. VERIFYING LOCAL STORAGE..."
      );

      console.log(
        "LOCAL STORAGE CAREER ID =",
        localStorage.getItem("selectedCareerId")
      );

      console.log(
        "LOCAL STORAGE CAREER NAME =",
        localStorage.getItem("selectedCareerName")
      );

      // =====================================================
      // 6. GENERATE PERSONALIZED ROADMAP
      // =====================================================

      console.log("");
      console.log(
        "12. GENERATING ROADMAP..."
      );

      console.log(
        "13. ROADMAP REQUEST CAREER ID =",
        career.id
      );

      const roadmapResponse =
        await api.post(
          `/api/student/roadmap/${career.id}`
        );

      // =====================================================
      // 7. ROADMAP RESPONSE DEBUG
      // =====================================================

      console.log("");
      console.log(
        "14. ROADMAP GENERATION RESPONSE =",
        roadmapResponse.data
      );

      console.log(
        "15. ROADMAP RESPONSE CAREER ID =",
        roadmapResponse.data.careerId
      );

      console.log(
        "16. ROADMAP RESPONSE CAREER NAME =",
        roadmapResponse.data.careerName
      );

      console.log(
        "17. ROADMAP RESPONSE ITEMS =",
        roadmapResponse.data.items
      );

      console.log(
        "18. ROADMAP ITEMS COUNT =",
        roadmapResponse.data.items?.length
      );

      // =====================================================
      // 8. CHECK EACH ROADMAP ITEM
      // =====================================================

      if (roadmapResponse.data.items) {

        console.log("");
        console.log(
          "========== ROADMAP ITEMS =========="
        );

        roadmapResponse.data.items.forEach(
          (item, index) => {

            console.log(
              `ITEM ${index + 1} =`,
              item
            );

            console.log(
              `ITEM ${index + 1} SKILL =`,
              item.skillName
            );

            console.log(
              `ITEM ${index + 1} STATUS =`,
              item.status
            );

            console.log(
              `ITEM ${index + 1} PRIORITY =`,
              item.priority
            );
          }
        );
      }

      // =====================================================
      // 9. UPDATE UI
      // =====================================================

      setSelectedCareer(career.name);

      console.log("");
      console.log(
        "19. UI SELECTED CAREER =",
        career.name
      );

      console.log("");
      console.log(
        "================================="
      );

      console.log(
        "CAREER SELECTION COMPLETED"
      );

      console.log(
        "CAREER ID =",
        career.id
      );

      console.log(
        "CAREER NAME =",
        career.name
      );

      console.log(
        "================================="
      );

      alert(
        `Career selected and personalized roadmap generated: ${career.name}`
      );

    } catch (err) {

      // =====================================================
      // ERROR DEBUGGING
      // =====================================================

      console.error("");
      console.error(
        "================================="
      );

      console.error(
        "CAREER SELECTION ERROR"
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
        "ERROR RESPONSE =",
        err.response?.data
      );

      console.error(
        "ERROR STATUS =",
        err.response?.status
      );

      console.error(
        "ERROR URL =",
        err.config?.url
      );

      console.error(
        "ERROR METHOD =",
        err.config?.method
      );

      console.error(
        "================================="
      );

      setError(
        "Failed to select career and generate roadmap"
      );
    }
  };

  // =====================================================
  // DIFFERENT CARD STYLES
  // =====================================================

  const cardStyles = [
    {
      icon: "🎨",
      gradient:
        "from-pink-500/20 via-purple-500/5 to-transparent",
      iconBg:
        "bg-pink-500/10 border-pink-400/20",
      hover:
        "hover:border-pink-400/40",
      button:
        "bg-pink-600 hover:bg-pink-700",
    },
    {
      icon: "⚙️",
      gradient:
        "from-blue-500/20 via-cyan-500/5 to-transparent",
      iconBg:
        "bg-blue-500/10 border-blue-400/20",
      hover:
        "hover:border-blue-400/40",
      button:
        "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: "☕",
      gradient:
        "from-orange-500/20 via-yellow-500/5 to-transparent",
      iconBg:
        "bg-orange-500/10 border-orange-400/20",
      hover:
        "hover:border-orange-400/40",
      button:
        "bg-orange-600 hover:bg-orange-700",
    },
    {
      icon: "🐍",
      gradient:
        "from-emerald-500/20 via-green-500/5 to-transparent",
      iconBg:
        "bg-emerald-500/10 border-emerald-400/20",
      hover:
        "hover:border-emerald-400/40",
      button:
        "bg-emerald-600 hover:bg-emerald-700",
    },
    {
      icon: "📊",
      gradient:
        "from-cyan-500/20 via-blue-500/5 to-transparent",
      iconBg:
        "bg-cyan-500/10 border-cyan-400/20",
      hover:
        "hover:border-cyan-400/40",
      button:
        "bg-cyan-600 hover:bg-cyan-700",
    },
    {
      icon: "🧠",
      gradient:
        "from-violet-500/20 via-fuchsia-500/5 to-transparent",
      iconBg:
        "bg-violet-500/10 border-violet-400/20",
      hover:
        "hover:border-violet-400/40",
      button:
        "bg-violet-600 hover:bg-violet-700",
    },
    {
      icon: "🤖",
      gradient:
        "from-purple-500/20 via-indigo-500/5 to-transparent",
      iconBg:
        "bg-purple-500/10 border-purple-400/20",
      hover:
        "hover:border-purple-400/40",
      button:
        "bg-purple-600 hover:bg-purple-700",
    },
    {
      icon: "🚀",
      gradient:
        "from-red-500/20 via-orange-500/5 to-transparent",
      iconBg:
        "bg-red-500/10 border-red-400/20",
      hover:
        "hover:border-red-400/40",
      button:
        "bg-red-600 hover:bg-red-700",
    },
    {
      icon: "💻",
      gradient:
        "from-indigo-500/20 via-blue-500/5 to-transparent",
      iconBg:
        "bg-indigo-500/10 border-indigo-400/20",
      hover:
        "hover:border-indigo-400/40",
      button:
        "bg-indigo-600 hover:bg-indigo-700",
    },
    {
      icon: "🌐",
      gradient:
        "from-teal-500/20 via-cyan-500/5 to-transparent",
      iconBg:
        "bg-teal-500/10 border-teal-400/20",
      hover:
        "hover:border-teal-400/40",
      button:
        "bg-teal-600 hover:bg-teal-700",
    },
  ];

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-5 relative overflow-hidden">

        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl px-8 py-7 text-center">

          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center text-2xl">
            🎯
          </div>

          <p className="text-lg font-semibold text-white">
            Loading careers...
          </p>

          <p className="text-sm text-slate-400 mt-2">
            Preparing your career options
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white px-5 py-8 relative overflow-hidden">

      {/* =====================================================
          PAGE BACKGROUND GLOW
      ===================================================== */}

      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="max-w-6xl mx-auto relative z-10">

        {/* =====================================================
            HEADER CARD
        ===================================================== */}

        <div className="relative overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-950/90 via-slate-900/90 to-purple-950/80 backdrop-blur-xl shadow-2xl p-7 md:p-8 mb-8">

          {/* Header Glow */}

          <div className="absolute -top-24 -right-20 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="absolute -bottom-24 left-1/3 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Header Content */}

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            {/* Left Content */}

            <div>

              <div className="flex items-center gap-3 mb-3">

                <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-400/20 flex items-center justify-center text-xl">
                  🎯
                </div>

                <p className="text-sm font-semibold text-indigo-300 tracking-wider">
                  SKILLPATH AI
                </p>

              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Choose Your Career
              </h1>

              <p className="text-slate-300/80 mt-3 max-w-2xl leading-relaxed">
                Select a career path you want to prepare for. SkillPath will
                personalize your skill gap, roadmap and learning journey.
              </p>

            </div>

            {/* Right Badge */}

            <div className="shrink-0">

              <div className="rounded-2xl border border-indigo-300/20 bg-indigo-400/10 px-5 py-4 text-center shadow-lg">

                <p className="text-xs text-indigo-300 uppercase tracking-wider">
                  Career Planning
                </p>

                <p className="text-sm font-semibold text-white mt-1">
                  Build Your Future 🚀
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            ERROR MESSAGE
        ===================================================== */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-500/10 backdrop-blur-xl px-5 py-4 text-red-300 flex items-center gap-3">

            <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
              ⚠️
            </div>

            <p>
              {error}
            </p>

          </div>
        )}

        {/* =====================================================
            SELECTED CAREER
        ===================================================== */}

        {selectedCareer && (
          <div className="mb-6 rounded-2xl border border-green-400/20 bg-green-500/10 backdrop-blur-xl px-5 py-4 text-green-300 flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-400/10 flex items-center justify-center text-lg">
              ✓
            </div>

            <div>
              <p className="text-xs text-green-400/70 uppercase tracking-wider">
                Selected Career
              </p>

              <p className="font-semibold text-green-300 mt-0.5">
                {selectedCareer}
              </p>
            </div>

          </div>
        )}

        {/* =====================================================
            CAREER SECTION HEADER
        ===================================================== */}

        <div className="mb-5">

          <p className="text-sm font-semibold text-indigo-400 tracking-wider">
            CAREER PATHS
          </p>

          <h2 className="text-2xl font-bold mt-1">
            Find Your Target Career
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Choose the career you want SkillPath AI to prepare you for.
          </p>

        </div>

        {/* =====================================================
            CAREER LIST
        ===================================================== */}

        {careers.length === 0 ? (

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl p-10 text-center">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-3xl mb-4">
              🔍
            </div>

            <p className="text-lg font-semibold text-slate-200">
              No careers available
            </p>

            <p className="text-sm text-slate-500 mt-2">
              Please try again later.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {careers.map((career, index) => {

              const style =
                cardStyles[index % cardStyles.length];

              const isSelected =
                selectedCareer === career.name;

              return (

                <div
                  key={career.id}
                  className={`
                    group relative overflow-hidden
                    rounded-3xl
                    border
                    ${
                      isSelected
                        ? "border-green-400/40"
                        : "border-white/10"
                    }
                    bg-slate-900/80
                    backdrop-blur-xl
                    p-6
                    shadow-xl
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    ${style.hover}
                    hover:bg-slate-800/90
                    hover:shadow-2xl
                  `}
                >

                  {/* Card Gradient */}

                  <div
                    className={`
                      absolute inset-0
                      bg-gradient-to-br
                      ${style.gradient}
                      opacity-35
                      pointer-events-none
                    `}
                  />

                  {/* Card Content */}

                  <div className="relative z-10">

                    {/* Icon */}

                    <div
                      className={`
                        w-14 h-14
                        rounded-2xl
                        border
                        ${style.iconBg}
                        flex items-center justify-center
                        text-2xl
                        mb-5
                        transition-all
                        duration-300
                        group-hover:scale-110
                      `}
                    >
                      {style.icon}
                    </div>

                    {/* Selected Badge */}

                    {isSelected && (
                      <span className="absolute top-0 right-0 rounded-full bg-green-500/15 border border-green-400/20 px-3 py-1 text-xs font-semibold text-green-300">
                        ✓ Selected
                      </span>
                    )}

                    {/* Career Name */}

                    <h2 className="text-xl font-bold text-white mb-3">
                      {career.name}
                    </h2>

                    {/* Description */}

                    <p className="text-sm text-slate-400 leading-relaxed min-h-[60px]">
                      {career.description ||
                        "Build the skills and knowledge required for this career path."}
                    </p>

                    {/* Divider */}

                    <div className="border-t border-white/10 my-5" />

                    {/* Career Info */}

                    <div className="flex items-center gap-2 mb-5">

                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm">
                        ✦
                      </div>

                      <span className="text-xs text-slate-500">
                        Personalized learning path
                      </span>

                    </div>

                    {/* Select Button */}

                    <button
                      onClick={() =>
                        handleSelectCareer(career)
                      }
                      className={`
                        w-full
                        rounded-xl
                        px-4 py-3
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        ${style.button}
                        hover:shadow-lg
                        active:scale-[0.98]
                      `}
                    >
                      {isSelected
                        ? "Career Selected"
                        : "Select Career"}

                      <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>

                    </button>

                  </div>

                </div>

              );
            })}

          </div>

        )}


      </div>

    </div>
  );
}

export default CareerSelection;





