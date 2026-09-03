
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // loginUser expects (name, email, password)
      // username is passed as both name and email
      const data = await loginUser(username, username, password);

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data) {
        setError(
          typeof err.response.data === "string"
            ? err.response.data
            : "Invalid login details."
        );
      } else {
        setError("Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-160px] left-[-160px] w-[420px] h-[420px] bg-indigo-600/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-160px] right-[-160px] w-[420px] h-[420px] bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl"></div>

      {/* Login Container */}
      <div className="relative w-full max-w-md">

        {/* Main Card */}
        <div className="bg-gradient-to-br from-indigo-950/90 via-slate-900/95 to-purple-950/90 border border-indigo-400/20 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-xl">

          {/* Logo / Header */}
          <div className="text-center mb-8">

            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20 mb-5">
              <span className="text-3xl">
                🚀
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="text-slate-400 mt-2">
              Continue your journey with{" "}
              <span className="text-indigo-400 font-medium">
                SkillPath AI
              </span>
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3.5 text-sm text-red-400 flex items-start gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email / Username
              </label>

              <div className="relative">

                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21c0-4-3.6-6-8-6s-8 2-8 6" />
                  <circle cx="12" cy="7" r="4" />
                </svg>

                <input
                  type="text"
                  placeholder="Enter your email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 pl-11 rounded-xl bg-slate-800/70 border border-slate-700/80 text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-600"
                />

              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">

                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="10" width="16" height="10" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 pl-11 rounded-xl bg-slate-800/70 border border-slate-700/80 text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-600"
                />

              </div>
            </div>

            {/* Remember Me + Forgot */}
            <div className="flex items-center justify-between text-sm pt-1">

              <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">

                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 accent-indigo-500"
                />

                Remember me
              </label>

              <button
                type="button"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot Password?
              </button>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-7">

            <div className="flex-1 h-px bg-slate-700/70"></div>

            <span className="text-xs text-slate-500">
              OR
            </span>

            <div className="flex-1 h-px bg-slate-700/70"></div>

          </div>

          {/* Register */}
          <p className="text-center text-slate-400 text-sm">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
            >
              Create Account
            </Link>

          </p>

          {/* Bottom Text */}
          <div className="text-center mt-6">

            <p className="text-xs text-slate-600">
              Learn • Improve • Track • Achieve 🚀
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;






