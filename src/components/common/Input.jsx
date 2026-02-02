import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  type = "text",
  icon: Icon,
  error,
  id,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-base font-medium text-[#141216] dark:text-white"
        >
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <div
        className={`
        relative flex w-full items-center rounded-lg border bg-white dark:bg-white/5
        ${
          error
            ? "border-danger focus-within:border-danger focus-within:ring-1 focus-within:ring-danger"
            : "border-[#e0dde3] dark:border-gray-700 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
        }
      `}
      >
        {Icon && (
          <div className="pointer-events-none flex h-full w-12 items-center justify-center text-[#726a81]">
            <Icon size={20} strokeWidth={1.5} />
          </div>
        )}
        <input
          type={inputType}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            h-12 w-full border-0 bg-transparent text-base text-[#141216] dark:text-white
            placeholder:text-[#726a81] focus:outline-none focus:ring-0
            ${icon ? "p-0 pr-4" : "px-4"}
            ${isPassword ? "pr-12" : ""}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="flex h-full w-12 items-center justify-center text-[#726a81] hover:text-[#141216] dark:hover:text-white"
          >
            {showPassword ? (
              <EyeOff size={20} strokeWidth={1.5} />
            ) : (
              <Eye size={20} strokeWidth={1.5} />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
};

export default Input;
