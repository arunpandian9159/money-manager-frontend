import { useState } from "react";
import Modal from "../common/Modal";
import CreditCardForm from "./CreditCardForm";
import { ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { accountsAPI } from "../../api/accounts";

const RegisterAccountModal = ({ isOpen, onClose, onAccountCreated }) => {
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePaymentSubmit = async (cardData, validity) => {
    if (validity.allValid) {
      setLoading(true);
      setError("");

      try {
        const result = await accountsAPI.create({
          name: cardData.holder,
          type: "credit",
          lastFour: cardData.number.replace(/\s/g, "").slice(-4),
          expiryMonth: cardData.month,
          expiryYear: cardData.year,
          balance: 0,
        });

        setLoading(false);
        if (result.success) {
          onAccountCreated?.(result.data.account);
          onClose();
        } else {
          setError(result.message || "Failed to create account.");
        }
      } catch (err) {
        setLoading(false);
        setError(err.response?.data?.message || "Failed to create account.");
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
          <div className="flex items-center gap-2 p-4 bg-danger/10 border border-danger/20 text-danger text-[10px] font-mono uppercase tracking-widest leading-relaxed">
            <AlertCircle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="p-2">
          <div className="flex items-center gap-3 mb-6 p-4 bg-primary/5 border border-primary/20">
            <ShieldCheck className="text-primary" size={24} />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">
                Secure Account Connection
              </h4>
              <p className="text-[10px] text-secondary/60 font-serif italic">
                Your financial data is encrypted and managed through
                institutional-grade protocols.
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
