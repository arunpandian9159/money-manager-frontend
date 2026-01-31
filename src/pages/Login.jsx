import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    <div className="flex flex-col p-8 sm:p-12">
      {/* Header */}
      <div className="mb-10 flex flex-col items-center">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-white shadow-lg shadow-navy/20">
            <span className="material-symbols-outlined text-[22px]">
              account_balance_wallet
            </span>
          </div>
          <span className="text-xl font-clash font-semibold tracking-wide text-navy">
            Money Manager
          </span>
        </div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta font-medium">
          Financial Intelligence
        </p>
        <h1 className="text-center font-clash text-3xl font-semibold leading-tight tracking-tight text-navy sm:text-4xl">
          Welcome Back
        </h1>
        <p className="mt-3 text-center text-[15px] font-normal text-slate-500 leading-relaxed max-w-xs mx-auto">
          Enter your credentials to access your personal dashboard.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Email Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-navy ml-1" htmlFor="email">
            Email Address
          </label>
          <div className="group relative flex w-full items-center rounded-lg border border-border-light bg-white transition-all duration-200 focus-within:border-terracotta focus-within:ring-1 focus-within:ring-terracotta">
            <div className="pointer-events-none flex h-full w-12 items-center justify-center text-slate-400 transition-colors group-focus-within:text-terracotta">
              <span className="material-symbols-outlined text-[20px]">
                mail
              </span>
            </div>
            <input
              className="h-11 w-full border-0 bg-transparent p-0 pr-4 text-[15px] text-navy placeholder:text-slate-400 focus:outline-none focus:ring-0 font-sans"
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm font-medium text-navy ml-1"
            htmlFor="password"
          >
            Password
          </label>
          <div className="group relative flex w-full items-center rounded-lg border border-border-light bg-white transition-all duration-200 focus-within:border-terracotta focus-within:ring-1 focus-within:ring-terracotta">
            <div className="pointer-events-none flex h-full w-12 items-center justify-center text-slate-400 transition-colors group-focus-within:text-terracotta">
              <span className="material-symbols-outlined text-[20px]">
                lock
              </span>
            </div>
            <input
              className="h-11 w-full border-0 bg-transparent p-0 pr-4 text-[15px] text-navy placeholder:text-slate-400 focus:outline-none focus:ring-0 font-sans"
              id="password"
              name="password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex h-full w-12 items-center justify-center text-slate-400 hover:text-navy transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? "visibility" : "visibility_off"}
              </span>
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-terracotta focus:ring-terracotta/20 cursor-pointer"
            />
            <span className="text-sm font-medium text-slate-600">
              Remember me
            </span>
          </label>
          <a
            className="text-sm font-medium text-terracotta hover:text-terracotta-light transition-colors"
            href="#"
          >
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 flex h-12 w-full items-center justify-center rounded-lg bg-navy px-6 text-[15px] font-semibold tracking-wide text-white shadow-md shadow-navy/10 transition-all hover:bg-navy-light focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : (
            "Sign In"
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
