import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Wallet, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login, error, setError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);
    if (result.success) {
      navigate("/app/dashboard");
    }
  };

  return (
    <div className="flex flex-col p-8 sm:p-12 bg-background-light dark:bg-background-dark min-h-[600px] justify-center">
      {/* Header */}
      <div className="mb-12 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-none bg-secondary text-background-light shadow-xl shadow-secondary/10">
            <Wallet size={20} strokeWidth={1.5} />
          </div>
          <span className="text-xl font-bold uppercase tracking-[0.2em] text-secondary dark:text-background-light">
            Money Manager
          </span>
        </div>
        <div className="flex items-center gap-4 mb-3">
          <span className="h-[1px] w-6 bg-primary"></span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-medium">
            Authentication Layer
          </span>
          <span className="h-[1px] w-6 bg-primary"></span>
        </div>
        <h1 className="text-center font-bold text-4xl uppercase tracking-tighter text-secondary dark:text-background-light">
          Terminal Access
        </h1>
        <p className="mt-4 text-center font-serif italic text-secondary/60 dark:text-background-light/60 max-w-xs mx-auto">
          Please provide your credentials to resolve your personal financial
          identity.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label
            className="font-mono text-[10px] uppercase tracking-widest text-secondary/40 ml-1"
            htmlFor="email"
          >
            Email Identity
          </label>
          <div className="group relative flex w-full items-center rounded-none border border-secondary/10 bg-white dark:bg-white/5 transition-all duration-300 focus-within:border-primary">
            <div className="pointer-events-none flex h-full w-12 items-center justify-center text-secondary/30 transition-colors group-focus-within:text-primary">
              <Mail size={18} strokeWidth={1.5} />
            </div>
            <input
              className="h-12 w-full border-0 bg-transparent p-0 pr-4 text-sm text-secondary dark:text-background-light placeholder:text-secondary/20 focus:outline-none focus:ring-0 font-mono"
              id="email"
              name="email"
              placeholder="IDENTITY@RESERVE.SYS"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <label
            className="font-mono text-[10px] uppercase tracking-widest text-secondary/40 ml-1"
            htmlFor="password"
          >
            Security Key
          </label>
          <div className="group relative flex w-full items-center rounded-none border border-secondary/10 bg-white dark:bg-white/5 transition-all duration-300 focus-within:border-primary">
            <div className="pointer-events-none flex h-full w-12 items-center justify-center text-secondary/30 transition-colors group-focus-within:text-primary">
              <Lock size={18} strokeWidth={1.5} />
            </div>
            <input
              className="h-12 w-full border-0 bg-transparent p-0 pr-4 text-sm text-secondary dark:text-background-light placeholder:text-secondary/20 focus:outline-none focus:ring-0 font-mono"
              id="password"
              name="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex h-full w-12 items-center justify-center text-secondary/30 hover:text-secondary transition-colors"
            >
              {showPassword ? (
                <EyeOff size={18} strokeWidth={1.5} />
              ) : (
                <Eye size={18} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 rounded-none border-secondary/20 text-primary focus:ring-primary/20 cursor-pointer"
            />
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary/60">
              Persist Session
            </span>
          </label>
          <a
            className="font-mono text-[10px] uppercase tracking-widest text-primary hover:text-accent transition-colors"
            href="#"
          >
            Key Recovery
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex h-14 w-full items-center justify-center rounded-none bg-secondary px-8 text-xs font-bold uppercase tracking-[0.2em] text-background-light shadow-xl shadow-secondary/10 transition-all hover:bg-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
        >
          <span className="relative z-10">
            {loading ? "Decrypting..." : "Initialize Session"}
          </span>
          {loading && (
            <span className="absolute inset-0 bg-primary/20 animate-pulse" />
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative mt-8 flex items-center py-2">
        <div className="flex-grow border-t border-slate-200"></div>
        <span className="mx-4 flex-shrink-0 text-xs font-medium text-slate-400 tracking-wider">
          OR
        </span>
        <div className="flex-grow border-t border-slate-200"></div>
      </div>

      {/* Google Sign In */}
      <button
        type="button"
        className="mt-4 flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-6 text-[15px] font-medium text-navy transition-colors hover:bg-stone-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-1 font-sans"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>

      {/* Footer */}
      <p className="mt-8 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-terracotta hover:text-terracotta-light hover:underline decoration-2 underline-offset-2 transition-all"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
