import { useState } from "react";
import Modal from "../common/Modal";
import CreditCardForm from "./CreditCardForm";
import { ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const RegisterAccountModal = ({ isOpen, onClose, onRegisterSuccess }) => {
  const { register, user: currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePaymentSubmit = async (cardData, validity) => {
    if (validity.allValid) {
      setLoading(true);
      setError("");

      const result = await register({
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

        <div className="p-2">
          <div className="flex items-center gap-3 mb-6 p-4 bg-primary/5 border border-primary/20">
            <ShieldCheck className="text-primary" size={24} />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">
                Secure Payment Processing
              </h4>
              <p className="text-[10px] text-secondary/60 font-serif italic">
                Your credentials are encrypted and stored in institutional-grade
                vaults.
              </p>
            </div>
          </div>
          <CreditCardForm
            defaultHolder={
              currentUser
                ? `${currentUser.firstName} ${currentUser.lastName}`
                : ""
            }
            onSubmit={handlePaymentSubmit}
            className="!p-0"
          />
        </div>
      </div>
    </Modal>
  );
};

export default RegisterAccountModal;
