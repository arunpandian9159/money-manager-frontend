import { useState } from "react";
import CreditCardForm from "./CreditCardForm";
import RegisterAccountModal from "../auth/RegisterAccountModal";

export default function CreditCardDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F9F8F4] p-12 flex flex-col items-center gap-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter text-[#0A192F] uppercase">
          UI Component Lab
        </h1>
        <p className="font-serif italic text-[#0A192F]/60 max-w-lg mx-auto">
          Testing high-fidelity interactions for systematic capital management
          and secure identity establishment.
        </p>
      </div>

      <div className="w-full max-w-4xl bg-white p-8 border border-[#0A192F]/5 shadow-editorial">
        <div className="flex justify-between items-center mb-10 pb-4 border-b border-[#0A192F]/5">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] font-bold text-[#0A192F]/40">
            01. Standalone Credit Card Form
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-[#D65A31] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#B84825] transition-all"
          >
            Launch Register Modal
          </button>
        </div>

        <CreditCardForm
          defaultHolder="RAHIL VAHORA"
          maskMiddle
          onSubmit={(state, validity) => {
            console.log("Submit:", state, validity);
            alert("Card Data Captured: " + state.number.slice(-4));
          }}
        />
      </div>

      <RegisterAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRegisterSuccess={(data) => console.log("Success:", data)}
      />

      <div className="mt-8 p-6 bg-[#0A192F] text-white/40 font-mono text-[10px] uppercase tracking-widest text-center w-full max-w-4xl">
        Secure Handshake Protocol Active • AES-256 Bit Encryption Verified
      </div>
    </main>
  );
}
