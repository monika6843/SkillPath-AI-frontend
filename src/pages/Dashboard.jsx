
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    college: "",
    degree: "",
    graduationYear: "",
    careerGoal: "",
    bio: "",
  });

  // Load student profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/api/student/profile");

        setProfile(response.data);

        setFormData({
          college: response.data.college || "",
          degree: response.data.degree || "",
          graduationYear: response.data.graduationYear || "",
          careerGoal: response.data.careerGoal || "",
          bio: response.data.bio || "",
        });
      } catch (err) {
        console.error("Profile fetch error:", err);

        setError("Unable to load student profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Update profile
  const handleSave = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const response = await api.put(
        "/api/student/profile",
        {
          college: formData.college,
          degree: formData.degree,
          graduationYear: formData.graduationYear
            ? Number(formData.graduationYear)
            : null,
          careerGoal: formData.careerGoal,
          bio: formData.bio,
        }
      );

      setProfile(response.data);

      setFormData({
        college: response.data.college || "",
        degree: response.data.degree || "",
        graduationYear: response.data.graduationYear || "",
        careerGoal: response.data.careerGoal || "",
        bio: response.data.bio || "",
      });

      setEditing(false);
      setSuccess("Profile updated successfully.");

    } catch (err) {
      console.error("Profile update error:", err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Unable to update profile.");
      }
    } finally {
      setSaving(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">

        <div className="text-center">

          <div className="w-14 h-14 mx-auto mb-5 rounded-2xl border-2 border-indigo-500/30 border-t-indigo-400 animate-spin"></div>

          <p className="text-slate-300 text-lg">
            Loading your profile...
          </p>

          <p className="text-slate-600 text-sm mt-2">
            Preparing your SkillPath dashboard
          </p>

        </div>

      </div>
    );
  }

  // Error
  if (error && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

        <div className="rounded-3xl border border-red-500/20 bg-slate-900/90 p-9 text-center shadow-2xl">

          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-3xl">
            ⚠️
          </div>

          <p className="text-red-300">
            {error}
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 lg:px-8 py-8 relative overflow-hidden">

      {/* ================================================= */}
      {/* BACKGROUND GLOW */}
      {/* ================================================= */}

      <div className="fixed -top-48 -right-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="fixed top-[45%] -left-48 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="fixed bottom-0 right-1/3 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>


      <div className="max-w-6xl mx-auto relative">

        {/* ================================================= */}
        {/* HERO HEADER */}
        {/* ================================================= */}

        <div className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-purple-950/60 p-7 sm:p-9 lg:p-10 mb-9 shadow-2xl">

          <div className="absolute -top-32 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

          <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">

                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse"></span>

                <span className="text-xs font-bold tracking-[0.2em] text-indigo-300">
                  SKILLPATH AI
                </span>

              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">

                Welcome back,{" "}

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  {profile?.name || "Student"}
                </span>

                <span className="ml-2">👋</span>

              </h1>

              <p className="text-slate-400 mt-4 max-w-2xl text-base sm:text-lg leading-7">
                Manage your profile, explore career opportunities and
                continue building the skills required for your dream career.
              </p>

            </div>


            {!editing && (
              <div className="flex flex-wrap gap-3 shrink-0">

                <button
                  onClick={() => {
                    setError("");
                    setSuccess("");
                    setEditing(true);
                  }}
                  className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3.5 font-semibold shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/25 hover:-translate-y-1 transition-all duration-300"
                >
                  ✏️ Edit Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-3.5 font-semibold text-red-300 hover:bg-red-500/20 hover:border-red-500/30 hover:-translate-y-1 transition-all duration-300"
                >
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>


        {/* ================================================= */}
        {/* SUCCESS */}
        {/* ================================================= */}

        {success && (
          <div className="mb-7 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-emerald-300 flex items-center gap-3">

            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              ✓
            </div>

            <span>{success}</span>

          </div>
        )}


        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {error && (
          <div className="mb-7 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-300 flex items-center gap-3">

            <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
              ⚠️
            </div>

            <span>{error}</span>

          </div>
        )}


        {/* ================================================= */}
        {/* PROFILE CARD */}
        {/* ================================================= */}

        <div className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-2xl mb-12">

          {/* Profile Header */}

          <div className="relative overflow-hidden p-7 sm:p-9 border-b border-slate-800 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/50">

            <div className="absolute -right-24 -top-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>

            <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">

              {/* Avatar */}

              <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-[30px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-4xl sm:text-5xl font-bold shadow-2xl shadow-indigo-500/20">

                {profile?.name
                  ? profile.name.charAt(0).toUpperCase()
                  : "S"}

              </div>


              {/* User Info */}

              <div>

                <p className="text-xs uppercase tracking-[0.2em] text-indigo-400 font-bold mb-2">
                  STUDENT PROFILE
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold">
                  {profile?.name || "Student"}
                </h2>

                <p className="text-slate-400 mt-2">
                  {profile?.email || "Email not available"}
                </p>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* VIEW MODE */}
          {/* ================================================= */}

          {!editing && (
            <div className="p-7 sm:p-9">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <ProfileItem
                  label="College"
                  value={profile?.college}
                  icon="🎓"
                  accent="indigo"
                />

                <ProfileItem
                  label="Degree"
                  value={profile?.degree}
                  icon="📖"
                  accent="purple"
                />

                <ProfileItem
                  label="Graduation Year"
                  value={profile?.graduationYear}
                  icon="📅"
                  accent="cyan"
                />

                <ProfileItem
                  label="Career Goal"
                  value={profile?.careerGoal}
                  icon="🎯"
                  accent="pink"
                />

              </div>


              {/* Bio */}

              <div className="mt-6 rounded-2xl bg-slate-950/80 border border-slate-800 p-6 sm:p-7 hover:border-slate-700 transition">

                <div className="flex items-center gap-4 mb-4">

                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl">
                    📝
                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-[0.15em] text-emerald-400 font-bold">
                      ABOUT YOU
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Personal introduction
                    </p>

                  </div>

                </div>

                <p className="text-slate-300 leading-7 text-base">
                  {profile?.bio || "No bio added yet."}
                </p>

              </div>

            </div>
          )}


          {/* ================================================= */}
          {/* EDIT MODE */}
          {/* ================================================= */}

          {editing && (
            <form onSubmit={handleSave} className="p-7 sm:p-9">

              <div className="mb-8">

                <p className="text-xs uppercase tracking-[0.2em] text-indigo-400 font-bold">
                  PROFILE SETTINGS
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                  Update your information
                </h2>

                <p className="text-slate-500 mt-2">
                  Keep your profile information up to date.
                </p>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <FormInput
                  label="College"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Enter your college"
                />

                <FormInput
                  label="Degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech CSE"
                />

                <FormInput
                  label="Graduation Year"
                  name="graduationYear"
                  type="number"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  placeholder="e.g. 2027"
                />

                <FormInput
                  label="Career Goal"
                  name="careerGoal"
                  value={formData.careerGoal}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack Java Developer"
                />

              </div>


              {/* Bio */}

              <div className="mt-6">

                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Bio
                </label>

                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us something about yourself..."
                  className="w-full rounded-2xl bg-slate-950/80 border border-slate-800 px-5 py-4 text-white placeholder-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none transition"
                />

              </div>


              {/* Buttons */}

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">

                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setError("");
                    setSuccess("");
                  }}
                  className="rounded-2xl border border-slate-700 px-7 py-3.5 text-slate-300 hover:bg-white/5 hover:border-slate-600 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3.5 font-semibold shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >

                  {saving ? (
                    <span className="flex items-center justify-center gap-3">

                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>

                      Saving...

                    </span>
                  ) : (
                    "Save Changes"
                  )}

                </button>

              </div>

            </form>
          )}

        </div>


        {/* ================================================= */}
        {/* LEARNING JOURNEY */}
        {/* ================================================= */}

        {!editing && (
          <div className="mt-10">

            {/* Section Heading */}

            <div className="mb-7">

              <div className="flex items-center gap-3 mb-2">

                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  🚀
                </div>

                <p className="text-xs sm:text-sm font-bold text-indigo-400 tracking-[0.2em]">
                  YOUR LEARNING JOURNEY
                </p>

              </div>

              <h2 className="text-3xl sm:text-4xl font-bold mt-3">

                Continue with{" "}

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  SkillPath
                </span>

              </h2>

              <p className="text-slate-500 mt-3 max-w-2xl leading-7">
                Everything you need to discover your career path,
                identify skill gaps, learn effectively and track your progress.
              </p>

            </div>


            {/* ================================================= */}
            {/* NAVIGATION CARDS */}
            {/* ================================================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              <NavigationCard
                icon="🛠️"
                title="My Skills"
                description="Add and manage your technical skills."
                accent="indigo"
                onClick={() => navigate("/skills")}
              />

              <NavigationCard
                icon="🎯"
                title="Career Selection"
                description="Explore and select your target career."
                accent="purple"
                onClick={() => navigate("/career")}
              />

              <NavigationCard
                icon="📊"
                title="Skill Gap"
                description="See which skills you need to improve."
                accent="cyan"
                onClick={() => navigate("/skill-gap")}
              />

              <NavigationCard
                icon="📚"
                title="Learning Resources"
                description="Find resources to build your skills."
                accent="emerald"
                onClick={() => navigate("/learning-resources")}
              />

              <NavigationCard
                icon="🗺️"
                title="Learning Roadmap"
                description="Follow your personalized learning path."
                accent="orange"
                onClick={() => navigate("/learning-roadmap")}
              />

              <NavigationCard
                icon="📈"
                title="Learning Progress"
                description="Track your roadmap progress."
                accent="blue"
                onClick={() => navigate("/learning-progress")}
              />

              <NavigationCard
                icon="🤖"
                title="AI Recommendation"
                description="Get personalized recommendations from AI."
                accent="pink"
                onClick={() => navigate("/ai-recommendation")}
              />

            </div>

          </div>
        )}

      </div>

    </div>
  );
}


// =========================================================
// PROFILE ITEM
// =========================================================

function ProfileItem({
  label,
  value,
  icon,
  accent = "indigo",
}) {

  const accentClasses = {

    indigo: {
      icon: "bg-indigo-500/10 border-indigo-500/20",
      text: "text-indigo-400",
      border: "hover:border-indigo-500/40",
      glow: "hover:shadow-indigo-500/5",
    },

    purple: {
      icon: "bg-purple-500/10 border-purple-500/20",
      text: "text-purple-400",
      border: "hover:border-purple-500/40",
      glow: "hover:shadow-purple-500/5",
    },

    cyan: {
      icon: "bg-cyan-500/10 border-cyan-500/20",
      text: "text-cyan-400",
      border: "hover:border-cyan-500/40",
      glow: "hover:shadow-cyan-500/5",
    },

    pink: {
      icon: "bg-pink-500/10 border-pink-500/20",
      text: "text-pink-400",
      border: "hover:border-pink-500/40",
      glow: "hover:shadow-pink-500/5",
    },
  };

  const style = accentClasses[accent];

  return (
    <div
      className={`group rounded-2xl bg-slate-950/80 border border-slate-800 p-6 min-h-[115px] flex items-center transition-all duration-300 hover:-translate-y-1 ${style.border} ${style.glow} hover:shadow-xl`}
    >

      <div className="flex items-center gap-5 w-full">

        <div
          className={`w-14 h-14 shrink-0 rounded-2xl border flex items-center justify-center text-2xl ${style.icon} group-hover:scale-105 transition-transform`}
        >
          {icon}
        </div>

        <div className="min-w-0">

          <p className={`text-xs uppercase tracking-[0.15em] font-bold ${style.text}`}>
            {label}
          </p>

          <p className="mt-2 text-lg font-semibold text-slate-100 truncate">
            {value || "Not added yet"}
          </p>

        </div>

      </div>

    </div>
  );
}


// =========================================================
// FORM INPUT
// =========================================================

function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) {

  return (
    <div>

      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl bg-slate-950/80 border border-slate-800 px-5 py-4 text-white placeholder-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
      />

    </div>
  );
}


// =========================================================
// NAVIGATION CARD
// =========================================================

function NavigationCard({
  icon,
  title,
  description,
  accent = "indigo",
  onClick,
}) {

  const accentClasses = {

    indigo: {
      icon: "bg-indigo-500/10 border-indigo-500/20",
      iconHover: "group-hover:bg-indigo-500/20",
      text: "text-indigo-400",
      border: "hover:border-indigo-500/50",
      glow: "hover:shadow-indigo-500/10",
    },

    purple: {
      icon: "bg-purple-500/10 border-purple-500/20",
      iconHover: "group-hover:bg-purple-500/20",
      text: "text-purple-400",
      border: "hover:border-purple-500/50",
      glow: "hover:shadow-purple-500/10",
    },

    cyan: {
      icon: "bg-cyan-500/10 border-cyan-500/20",
      iconHover: "group-hover:bg-cyan-500/20",
      text: "text-cyan-400",
      border: "hover:border-cyan-500/50",
      glow: "hover:shadow-cyan-500/10",
    },

    emerald: {
      icon: "bg-emerald-500/10 border-emerald-500/20",
      iconHover: "group-hover:bg-emerald-500/20",
      text: "text-emerald-400",
      border: "hover:border-emerald-500/50",
      glow: "hover:shadow-emerald-500/10",
    },

    orange: {
      icon: "bg-orange-500/10 border-orange-500/20",
      iconHover: "group-hover:bg-orange-500/20",
      text: "text-orange-400",
      border: "hover:border-orange-500/50",
      glow: "hover:shadow-orange-500/10",
    },

    blue: {
      icon: "bg-blue-500/10 border-blue-500/20",
      iconHover: "group-hover:bg-blue-500/20",
      text: "text-blue-400",
      border: "hover:border-blue-500/50",
      glow: "hover:shadow-blue-500/10",
    },

    pink: {
      icon: "bg-pink-500/10 border-pink-500/20",
      iconHover: "group-hover:bg-pink-500/20",
      text: "text-pink-400",
      border: "hover:border-pink-500/50",
      glow: "hover:shadow-pink-500/10",
    },
  };

  const style = accentClasses[accent];

  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden text-left rounded-[26px] border border-slate-800 bg-slate-900/85 backdrop-blur-xl p-7 min-h-[205px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:bg-slate-900 ${style.border} hover:shadow-2xl ${style.glow}`}
    >

      {/* Decorative Glow */}

      <div className="absolute -top-24 -right-24 w-52 h-52 bg-white/[0.02] rounded-full blur-3xl group-hover:bg-white/[0.05] transition-all duration-500"></div>

      <div className="relative">

        {/* Icon */}

        <div
          className={`w-16 h-16 rounded-2xl border flex items-center justify-center text-3xl transition-all duration-300 ${style.icon} ${style.iconHover} group-hover:scale-110`}
        >
          {icon}
        </div>


        {/* Title */}

        <h3 className="font-bold text-xl text-white mt-6">
          {title}
        </h3>


        {/* Description */}

        <p className="text-sm text-slate-500 mt-2 leading-6 max-w-sm">
          {description}
        </p>

      </div>


      {/* Bottom Action */}

      <div className={`relative mt-6 flex items-center justify-between text-sm font-bold ${style.text}`}>

        <span>
          Explore
        </span>

        <span className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center transform group-hover:translate-x-1 group-hover:bg-white/[0.06] transition-all duration-300">
          →
        </span>

      </div>

    </button>
  );
}


export default Dashboard;


