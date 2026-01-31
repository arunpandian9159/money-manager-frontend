const variants = {
  primary: "bg-primary hover:bg-primary/90 text-white shadow-md",
  success:
    "bg-success hover:bg-[#059669] text-white shadow-sm shadow-green-200 dark:shadow-none",
  danger: "bg-danger hover:bg-red-600 text-white",
  secondary:
    "bg-gray-100 dark:bg-white/10 text-[#617089] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20",
  outline: "border border-[#e0dde3] bg-white text-[#111318] hover:bg-gray-50",
};

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  disabled = false,
  loading = false,
  type = "button",
  className = "",
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2 rounded-lg font-bold
        transition-all transform active:scale-95
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="material-symbols-outlined text-[20px]">
              {icon}
            </span>
          )}
          {children}
          {icon && iconPosition === "right" && (
            <span className="material-symbols-outlined text-[20px]">
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
