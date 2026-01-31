import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register, error, setError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
    if (validationError) setValidationError("");
  };

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    const password = formData.password;
    if (!password) return { level: 0, text: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2)
      return {
        level: strength,
        text: "Weak",
        color: "bg-red-400",
        width: "w-1/4",
      };
    if (strength <= 3)
      return {
        level: strength,
        text: "Fair",
        color: "bg-yellow-400",
        width: "w-2/4",
      };
    if (strength <= 4)
      return {
        level: strength,
        text: "Strong",
        color: "bg-sage",
        width: "w-3/4",
      };
    return {
      level: strength,
      text: "Very Strong",
      color: "bg-sage",
      width: "w-full",
    };
  }, [formData.password]);

  const passwordsMatch =
    formData.confirmPassword && formData.password === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreedToTerms) {
      setValidationError(
        "Please agree to the Terms of Service and Privacy Policy",
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setValidationError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    const result = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    });
    setLoading(false);

    if (result.success) {
      navigate("/app/dashboard");
    }
  };

  return (
    <div className="p-8 md:p-12 flex flex-col gap-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-navy font-clash">
          Create Account
        </h1>
        <p className="text-slate-500 text-lg font-serif italic">
          Start managing your finances today.
        </p>
      </div>

      {/* Error Message */}
      {(error || validationError) && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error || validationError}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
              First Name
            </label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[20px]">
                  person
                </span>
              </div>
              <input
                className="w-full h-12 pl-10 pr-10 border border-gray-300 bg-transparent text-slate-900 placeholder:text-slate-400 focus:border-terracotta focus:ring-1 focus:ring-terracotta text-sm transition-all duration-300"
                placeholder="Jane"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {formData.firstName && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sage flex items-center pointer-events-none">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
              Last Name
            </label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[20px]">
                  person
                </span>
              </div>
              <input
                className="w-full h-12 pl-10 pr-10 border border-gray-300 bg-transparent text-slate-900 placeholder:text-slate-400 focus:border-terracotta focus:ring-1 focus:ring-terracotta text-sm transition-all duration-300"
                placeholder="Doe"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {formData.lastName && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sage flex items-center pointer-events-none">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-[20px]">
                mail
              </span>
            </div>
            <input
              className="w-full h-12 pl-10 pr-10 border border-gray-300 bg-transparent text-slate-900 placeholder:text-slate-400 focus:border-terracotta focus:ring-1 focus:ring-terracotta text-sm transition-all duration-300"
              placeholder="jane.doe@example.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {formData.email && formData.email.includes("@") && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sage flex items-center pointer-events-none">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
            Password
          </label>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-[20px]">
                lock
              </span>
            </div>
            <input
              className="w-full h-12 pl-10 pr-10 border border-gray-300 bg-transparent text-slate-900 placeholder:text-slate-400 focus:border-terracotta focus:ring-1 focus:ring-terracotta text-sm transition-all duration-300"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 flex items-center transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-2 space-y-2">
              <div className="h-1 w-full bg-slate-100 overflow-hidden flex">
                <div
                  className={`h-full ${passwordStrength.color} ${passwordStrength.width} transition-all duration-300`}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-1.5 items-center">
                  <span className="material-symbols-outlined text-[14px] text-sage">
                    check
                  </span>
                  <span className="text-sm font-serif italic text-slate-500">
                    8+ characters
                  </span>
                </div>
                <span
                  className={`text-xs font-medium uppercase tracking-wider ${passwordStrength.level >= 4 ? "text-sage" : passwordStrength.level >= 3 ? "text-yellow-500" : "text-red-400"}`}
                >
                  {passwordStrength.text}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
            Confirm Password
          </label>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-[20px]">
                lock_reset
              </span>
            </div>
            <input
              className="w-full h-12 pl-10 pr-10 border border-gray-300 bg-transparent text-slate-900 placeholder:text-slate-400 focus:border-terracotta focus:ring-1 focus:ring-terracotta text-sm transition-all duration-300"
              placeholder="••••••••"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {passwordsMatch ? (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sage flex items-center pointer-events-none">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 flex items-center transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showConfirmPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 mt-1">
          <div className="flex items-center h-6">
            <input
              className="w-4 h-4 text-navy bg-white border-slate-300 rounded-sm focus:ring-navy focus:ring-offset-0 cursor-pointer"
              id="terms"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
          </div>
          <label
            className="text-base font-serif text-slate-600 leading-snug"
            htmlFor="terms"
          >
            I agree to the{" "}
            <a
              className="text-navy hover:text-terracotta underline decoration-1 underline-offset-2 transition-colors"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              className="text-navy hover:text-terracotta underline decoration-1 underline-offset-2 transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            .
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-navy hover:bg-navy-light text-white font-medium h-12 shadow-none transition-all duration-300 flex items-center justify-center gap-2 mt-2 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : (
            <>
              <span className="tracking-wide">Create Account</span>
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="text-center pt-2 border-t border-slate-100">
        <p className="text-base font-serif text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-navy font-semibold hover:text-terracotta underline decoration-1 underline-offset-2 transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
