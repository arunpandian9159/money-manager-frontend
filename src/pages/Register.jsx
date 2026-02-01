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
    <div className="p-8 md:p-12 flex flex-col gap-10 bg-background-light dark:bg-background-dark min-h-[800px] justify-center">
      {/* Header */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-4 mb-3">
          <span className="h-[1px] w-6 bg-primary"></span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-medium">
            New Entity Registration
          </span>
          <span className="h-[1px] w-6 bg-primary"></span>
        </div>
        <h1 className="text-center font-bold text-4xl uppercase tracking-tighter text-secondary dark:text-background-light">
          Create Identity
        </h1>
        <p className="mt-4 text-center font-serif italic text-secondary/60 dark:text-background-light/60 max-w-sm mx-auto">
          Begin your journey towards total capital transparency and systematic
          wealth management.
        </p>
      </div>

      {/* Error Message */}
      {(error || validationError) && (
        <div className="p-4 bg-danger/5 border border-danger/10 rounded-none text-danger text-[11px] font-mono uppercase tracking-wider">
          {error || validationError}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] uppercase tracking-widest text-secondary/40 ml-1">
              Primary Name
            </label>
            <div className="relative group">
              <input
                className="w-full h-12 px-4 border border-secondary/10 bg-white dark:bg-white/5 text-secondary dark:text-background-light placeholder:text-secondary/20 focus:border-primary transition-all duration-300 font-mono text-sm rounded-none focus:outline-none focus:ring-0"
                placeholder="FIRST"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] uppercase tracking-widest text-secondary/40 ml-1">
              Secondary Name
            </label>
            <div className="relative group">
              <input
                className="w-full h-12 px-4 border border-secondary/10 bg-white dark:bg-white/5 text-secondary dark:text-background-light placeholder:text-secondary/20 focus:border-primary transition-all duration-300 font-mono text-sm rounded-none focus:outline-none focus:ring-0"
                placeholder="LAST"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] uppercase tracking-widest text-secondary/40 ml-1">
            Communication Identity
          </label>
          <div className="relative group">
            <input
              className="w-full h-12 px-4 border border-secondary/10 bg-white dark:bg-white/5 text-secondary dark:text-background-light placeholder:text-secondary/20 focus:border-primary transition-all duration-300 font-mono text-sm rounded-none focus:outline-none focus:ring-0"
              placeholder="IDENTITY@RESERVE.SYS"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] uppercase tracking-widest text-secondary/40 ml-1">
            Security Key
          </label>
          <div className="relative group">
            <input
              className="w-full h-12 px-4 border border-secondary/10 bg-white dark:bg-white/5 text-secondary dark:text-background-light placeholder:text-secondary/20 focus:border-primary transition-all duration-300 font-mono text-sm rounded-none focus:outline-none focus:ring-0"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/30 hover:text-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] uppercase tracking-widest text-secondary/40 ml-1">
            Key Verification
          </label>
          <div className="relative group">
            <input
              className="w-full h-12 px-4 border border-secondary/10 bg-white dark:bg-white/5 text-secondary dark:text-background-light placeholder:text-secondary/20 focus:border-primary transition-all duration-300 font-mono text-sm rounded-none focus:outline-none focus:ring-0"
              placeholder="••••••••"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 mt-2">
          <div className="flex items-center h-6">
            <input
              className="w-4 h-4 text-primary bg-white border-secondary/20 rounded-none focus:ring-primary/20 cursor-pointer"
              id="terms"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
          </div>
          <label
            className="font-mono text-[9px] uppercase tracking-widest text-secondary/40 leading-relaxed"
            htmlFor="terms"
          >
            I acknowledge the institutional{" "}
            <a className="text-primary hover:text-accent underline" href="#">
              Protocol
            </a>{" "}
            and{" "}
            <a className="text-primary hover:text-accent underline" href="#">
              Privacy Directive
            </a>
            .
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex h-14 w-full items-center justify-center rounded-none bg-secondary px-8 text-xs font-bold uppercase tracking-[0.2em] text-background-light shadow-xl shadow-secondary/10 transition-all hover:bg-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
        >
          <span className="relative z-10">
            {loading ? "Registering Entity..." : "Establish Identity"}
          </span>
          {loading && (
            <span className="absolute inset-0 bg-primary/20 animate-pulse" />
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="text-center pt-8 border-t border-secondary/5">
        <p className="font-serif italic text-secondary/60">
          Already established in the system?{" "}
          <Link
            to="/login"
            className="text-primary font-bold not-italic hover:text-accent underline"
          >
            Authenticate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
