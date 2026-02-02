import { useState } from "react";
import Modal from "../common/Modal";
import CreditCardForm from "../ui/CreditCardForm";
import { User, Mail, Lock, ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const RegisterAccountModal = ({ isOpen, onClose, onRegisterSuccess }) => {
  const { register } = useAuth();
  const [step, setStep] = useState(1); // 1: Identity, 2: Payment
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleUserChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleIdentitySubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setStep(2);
  };

  const handlePaymentSubmit = async (cardData, validity) => {
    if (validity.allValid) {
      setLoading(true);
      setError("");

      const result = await register({
        ...userData,
        cardData,
      });

      setLoading(false);
      if (result.success) {
        onRegisterSuccess?.(result.data);
        onClose();
      } else {
        setError(result.error || "Failed to establish identity.");
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Premium Account"
      size="xl"
    >
      <div className="flex flex-col gap-6">
        {error && (
          <div className="flex items-center gap-2 p-4 bg-danger/10 border border-danger/20 text-danger text-[10px] font-mono uppercase tracking-widest">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step === 1 ? "bg-primary text-white" : "bg-success text-white"}`}
            >
              {step > 1 ? "✓" : "1"}
            </div>
            <span
              className={`text-[10px] uppercase tracking-widest font-mono ${step === 1 ? "text-primary" : "text-secondary/40"}`}
            >
              Identity
            </span>
          </div>
          <div className="h-[1px] w-12 bg-secondary/10"></div>
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step === 2 ? "bg-primary text-white" : "bg-secondary text-white/20"}`}
            >
              2
            </div>
            <span
              className={`text-[10px] uppercase tracking-widest font-mono ${step === 2 ? "text-primary" : "text-secondary/40"}`}
            >
              Payment
            </span>
          </div>
        </div>

        {step === 1 ? (
          <form
            onSubmit={handleIdentitySubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2"
          >
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-secondary/40 ml-1 flex items-center gap-1">
                <User size={10} /> Primary Name
              </label>
              <input
                className="w-full h-12 px-4 border border-secondary/10 bg-white text-secondary placeholder:text-secondary/20 focus:border-primary transition-all duration-300 font-mono text-sm rounded-none focus:outline-none"
                placeholder="FIRST NAME"
                name="firstName"
                value={userData.firstName}
                onChange={handleUserChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-secondary/40 ml-1 flex items-center gap-1">
                <User size={10} /> Secondary Name
              </label>
              <input
                className="w-full h-12 px-4 border border-secondary/10 bg-white text-secondary placeholder:text-secondary/20 focus:border-primary transition-all duration-300 font-mono text-sm rounded-none focus:outline-none"
                placeholder="LAST NAME"
                name="lastName"
                value={userData.lastName}
                onChange={handleUserChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-secondary/40 ml-1 flex items-center gap-1">
                <Mail size={10} /> Communication Identity
              </label>
              <input
                className="w-full h-12 px-4 border border-secondary/10 bg-white text-secondary placeholder:text-secondary/20 focus:border-primary transition-all duration-300 font-mono text-sm rounded-none focus:outline-none"
                placeholder="IDENTITY@RESERVE.SYS"
                type="email"
                name="email"
                value={userData.email}
                onChange={handleUserChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-secondary/40 ml-1 flex items-center gap-1">
                <Lock size={10} /> Security Key
              </label>
              <input
                className="w-full h-12 px-4 border border-secondary/10 bg-white text-secondary placeholder:text-secondary/20 focus:border-primary transition-all duration-300 font-mono text-sm rounded-none focus:outline-none"
                placeholder="••••••••"
                type="password"
                name="password"
                value={userData.password}
                onChange={handleUserChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-secondary/40 ml-1 flex items-center gap-1">
                <Lock size={10} /> Key Verification
              </label>
              <input
                className="w-full h-12 px-4 border border-secondary/10 bg-white text-secondary placeholder:text-secondary/20 focus:border-primary transition-all duration-300 font-mono text-sm rounded-none focus:outline-none"
                placeholder="••••••••"
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleUserChange}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 mt-4 flex h-14 w-full items-center justify-center rounded-none bg-secondary px-8 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-primary disabled:opacity-50"
            >
              {loading ? "Establishing Protocol..." : "Continue to Payment"}
            </button>
          </form>
        ) : (
          <div className="p-2">
            <div className="flex items-center gap-3 mb-6 p-4 bg-primary/5 border border-primary/20">
              <ShieldCheck className="text-primary" size={24} />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Secure Payment Processing
                </h4>
                <p className="text-[10px] text-secondary/60 font-serif italic">
                  Your credentials are encrypted and stored in
                  institutional-grade vaults.
                </p>
              </div>
            </div>
            <CreditCardForm
              defaultHolder={`${userData.firstName} ${userData.lastName}`}
              onSubmit={handlePaymentSubmit}
              className="!p-0"
            />
            <button
              onClick={() => setStep(1)}
              className="mt-4 text-[10px] uppercase tracking-widest font-bold text-secondary/40 hover:text-primary transition-colors text-center w-full"
            >
              ← Back to Identity Verification
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default RegisterAccountModal;
