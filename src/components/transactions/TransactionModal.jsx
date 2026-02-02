import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  X,
  Briefcase,
  User,
  CheckCircle2,
  Calendar,
  Clock,
  Fuel,
  Utensils,
  Film,
  Activity,
  Car,
  HandCoins,
  ShoppingBag,
  Zap,
  GraduationCap,
  MoreHorizontal,
  CreditCard,
} from "lucide-react";
import { Modal, Button, Input, Select } from "../common";
import { transactionsAPI } from "../../api";

const CATEGORIES = [
  { value: "fuel", label: "Fuel" },
  { value: "food", label: "Food" },
  { value: "entertainment", label: "Entertainment" },
  { value: "medical", label: "Medical" },
  { value: "transportation", label: "Transportation" },
  { value: "loan_emi", label: "Loan/EMI" },
  { value: "shopping", label: "Shopping" },
  { value: "utilities", label: "Utilities" },
  { value: "education", label: "Education" },
  { value: "others", label: "Others" },
];

const CATEGORY_ICONS = {
  fuel: Fuel,
  food: Utensils,
  entertainment: Film,
  medical: Activity,
  transportation: Car,
  loan_emi: HandCoins,
  shopping: ShoppingBag,
  utilities: Zap,
  education: GraduationCap,
  others: MoreHorizontal,
};

const TransactionModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  accounts = [],
}) => {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    description: "",
    category: "others",
    division: "personal",
    date: format(new Date(), "yyyy-MM-dd"),
    time: format(new Date(), "HH:mm"),
    account: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        amount: initialData.amount.toString(),
        date: format(new Date(initialData.date), "yyyy-MM-dd"),
        time: format(new Date(initialData.date), "HH:mm"),
        account: initialData.account?._id || initialData.account || "",
      });
    } else {
      setFormData({
        type: "expense",
        amount: "",
        description: "",
        category: "others",
        division: "personal",
        date: format(new Date(), "yyyy-MM-dd"),
        time: format(new Date(), "HH:mm"),
        account: accounts[0]?._id || "",
      });
    }
    setError("");
  }, [initialData, isOpen, accounts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description || !formData.account) {
      setError("Please fill all required fields");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const dateTime = new Date(`${formData.date}T${formData.time || "00:00"}`);
      const data = {
        ...formData,
        amount: parseFloat(formData.amount),
        date: dateTime.toISOString(),
      };
      delete data.time;

      if (initialData?._id) {
        await transactionsAPI.update(initialData._id, data);
      } else {
        await transactionsAPI.create(data);
      }

      onSubmit();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save transaction");
    } finally {
      setSaving(false);
    }
  };

  const DivisionCard = ({
    type,
    selected,
    onClick,
    icon: Icon,
    title,
    subtitle,
  }) => (
    <div
      onClick={onClick}
      className={`
        relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
        ${
          selected
            ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-lg scale-[1.02]"
            : "border-secondary/5 dark:border-white/5 bg-white dark:bg-white/5 hover:border-primary/30"
        }
      `}
    >
      <div
        className={`
        flex items-center justify-center w-12 h-12 rounded-full
        ${selected ? "bg-primary text-white" : "bg-secondary/5 dark:bg-white/10 text-secondary/40"}
      `}
      >
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <div className="flex-1">
        <h4
          className={`font-bold ${selected ? "text-primary" : "text-secondary dark:text-background-light"}`}
        >
          {title}
        </h4>
        <p className="text-xs text-secondary/40 dark:text-background-light/40">
          {subtitle}
        </p>
      </div>
      {selected && (
        <div className="absolute top-4 right-4 text-primary">
          <CheckCircle2
            size={20}
            className="text-primary-foreground"
          />
        </div>
      )}
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Transaction" : "Add Transaction"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg text-danger text-sm font-medium">
            {error}
          </div>
        )}

        {/* Type Toggle */}
        <div className="flex p-1 bg-secondary/5 dark:bg-white/5 rounded-xl">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: "income" })}
            className={`
              flex-1 py-3 px-6 rounded-lg font-bold transition-all duration-300
              ${
                formData.type === "income"
                  ? "bg-white dark:bg-white/10 shadow-md text-success scale-[1.01]"
                  : "text-secondary/40 hover:text-secondary dark:text-background-light/40"
              }
            `}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: "expense" })}
            className={`
              flex-1 py-3 px-6 rounded-lg font-bold transition-all duration-300
              ${
                formData.type === "expense"
                  ? "bg-white dark:bg-white/10 shadow-md text-danger scale-[1.01]"
                  : "text-secondary/40 hover:text-secondary dark:text-background-light/40"
              }
            `}
          >
            Expense
          </button>
        </div>

        {/* Amount Field */}
        <div className="flex flex-col items-center gap-2">
          <label className="font-mono text-[16px] uppercase tracking-widest text-secondary">
            Amount
          </label>
          <div className="flex items-center gap-3 w-full justify-center group">
            <span className="text-4xl font-serif italic text-secondary/20 dark:text-background-light/20 group-focus-within:text-primary transition-colors">
              ₹
            </span>
            <input
              type="number"
              step="1"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              placeholder="0.00"
              required
              className={`
                text-6xl font-bold bg-transparent border-t-0 border-l-0 border-r-0 border-b-2 
                focus:outline-none focus:ring-0 text-center w-full max-w-[280px] transition-all duration-500
                ${
                  formData.type === "expense"
                    ? "border-danger/20 focus:border-danger"
                    : "border-success/20 focus:border-success"
                }
              `}
            />
          </div>
        </div>

        {/* Division Selection */}
        <div className="flex flex-col gap-3">
          <label className="font-mono text-[14px] uppercase tracking-widest text-secondary">
            Division
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DivisionCard
              type="office"
              selected={formData.division === "office"}
              onClick={() => setFormData({ ...formData, division: "office" })}
              icon={Briefcase}
              title="Office"
              subtitle="Business exp."
            />
            <DivisionCard
              type="personal"
              selected={formData.division === "personal"}
              onClick={() => setFormData({ ...formData, division: "personal" })}
              icon={User}
              title="Personal"
              subtitle="My account"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-3">
          <label className="font-mono text-[14px] uppercase tracking-widest text-secondary">
            Description
          </label>
          <Input
            placeholder="What is this for?"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
          className="w-full"
        />
        </div>

        {/* Category & Date/Time Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
          <Select
            label="Category"
            options={CATEGORIES}
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="sm:col-span-5"
          />
          <div className="flex flex-col gap-2 sm:col-span-7">
            <label className="font-mono text-[14px] uppercase tracking-widest text-secondary">
              Date & Time
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Calendar
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/40 pointer-events-none"
                />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full h-12 pl-10 pr-3 bg-transparent border-b-2 border-secondary/10 dark:border-white/10 focus:border-primary outline-none transition-all font-mono text-sm"
                />
              </div>
              <div className="relative flex-1">
                <Clock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/40 pointer-events-none"
                />
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className="w-full h-12 pl-10 pr-3 bg-transparent border-b-2 border-secondary/10 dark:border-white/10 focus:border-primary outline-none transition-all font-mono text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Account Selection */}
        <Select
          label="Payment Account"
          options={accounts.map((a) => ({ value: a._id, label: a.name }))}
          value={formData.account}
          onChange={(e) =>
            setFormData({ ...formData, account: e.target.value })
          }
          placeholder="Select account"
        />

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-4 mt-4 pt-6 border-t border-secondary/5 dark:border-white/5">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 font-bold text-secondary/60 hover:text-secondary dark:text-background-light/60 dark:hover:text-background-light transition-colors"
          >
            Cancel
          </button>
          <Button
            type="submit"
            loading={saving}
            className={`px-8 py-3 rounded-xl shadow-lg transition-transform active:scale-95 ${
              formData.type === "expense"
                ? "bg-danger hover:bg-danger/90"
                : "bg-success hover:bg-success/90"
            }`}
          >
            {initialData ? "Update Transaction" : "Save Transaction"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TransactionModal;
