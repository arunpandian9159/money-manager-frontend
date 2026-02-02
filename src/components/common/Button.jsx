const variants = {
  primary: "bg-primary text-white hover:bg-primary-dark shadow-soft",
  success: "bg-success text-white hover:opacity-90 shadow-soft",
  danger: "bg-danger text-white hover:opacity-90 shadow-soft",
  secondary:
    "bg-accent-light dark:bg-accent-light/10 text-accent-dark dark:text-accent-light hover:bg-accent-light/80 dark:hover:bg-accent-light/20",
  outline:
    "border border-secondary/10 dark:border-background-light/10 bg-transparent text-secondary dark:text-background-light hover:bg-secondary/5 dark:hover:bg-background-light/5",
  ghost:
    "bg-transparent text-secondary/70 dark:text-background-light/70 hover:text-secondary dark:hover:text-background-light hover:bg-secondary/5",
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
  icon: Icon,
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
          {Icon && iconPosition === "left" && <Icon size={20} />}
          {children}
          {Icon && iconPosition === "right" && <Icon size={20} />}
        </>
      )}
    </button>
  );
};

export default Button;
