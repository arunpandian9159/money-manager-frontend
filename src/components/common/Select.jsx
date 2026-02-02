import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Select = ({
  label,
  options = [],
  value,
  onChange,
  id,
  name,
  placeholder = "Select an option",
  error,
  required = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        setIsOpen(!isOpen);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const currentIndex = options.findIndex((opt) => opt.value === value);
          const nextIndex = (currentIndex + 1) % options.length;
          handleSelect(options[nextIndex].value);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const currentIndex = options.findIndex((opt) => opt.value === value);
          const prevIndex =
            (currentIndex - 1 + options.length) % options.length;
          handleSelect(options[prevIndex].value);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`} ref={containerRef}>
      {label && (
        <label
          htmlFor={id}
          className="font-mono text-[10px] uppercase tracking-widest text-secondary/40"
        >
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <div
          id={id}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={`${id}-listbox`}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={`
            group flex h-12 w-full cursor-pointer items-center justify-between
            border-b-2 bg-transparent px-0 transition-all duration-300
            ${disabled ? "cursor-not-allowed opacity-50" : ""}
            ${
              error
                ? "border-danger"
                : "border-secondary/10 dark:border-white/10 hover:border-primary focus:border-primary outline-none"
            }
          `}
          {...props}
        >
          <span
            className={`text-base tracking-tight ${
              selectedOption
                ? "font-serif italic text-secondary dark:text-background-light"
                : "text-secondary/30 dark:text-background-light/30"
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-500 text-secondary/40 dark:text-white/40
              ${isOpen ? "rotate-180 text-primary" : ""}
            `}
            strokeWidth={1.5}
          />
        </div>

        {isOpen && (
          <div
            id={`${id}-listbox`}
            role="listbox"
            className="absolute z-50 mt-1 w-full border border-secondary/10 bg-white/95 dark:border-white/10 dark:bg-secondary/95 backdrop-blur-md shadow-editorial"
          >
            <div className="max-h-60 overflow-y-auto overflow-x-hidden no-scrollbar">
              {options.length > 0 ? (
                options.map((option, index) => (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={value === option.value}
                    onClick={() => handleSelect(option.value)}
                    style={{
                      animation: `staggered-reveal 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards ${index * 0.03}s`,
                      opacity: 0,
                      transform: "translateY(10px)",
                    }}
                    className={`
                      cursor-pointer px-4 py-3 text-sm transition-all duration-200
                      hover:bg-primary hover:text-white
                      ${
                        value === option.value
                          ? "bg-secondary text-white dark:bg-primary/20 dark:text-primary"
                          : "text-secondary/70 dark:text-background-light/70"
                      }
                    `}
                  >
                    <span className="font-mono text-[10px] mr-2 opacity-50 uppercase tracking-tighter">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <span className="font-serif italic text-base">
                      {option.label}
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center font-mono text-[10px] uppercase tracking-widest text-secondary/40 italic">
                  No options matched
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="font-mono text-[9px] uppercase tracking-tighter text-danger">
          {error}
        </p>
      )}

      {/* Global Animation Styles for Staggered Reveal */}
      <style>{`
        @keyframes staggered-reveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Select;
