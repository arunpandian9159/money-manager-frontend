const Card = ({
  children,
  title,
  subtitle,
  action,
  className = "",
  padding = true,
  variant = "default",
  ...props
}) => {
  const variants = {
    default:
      "bg-white dark:bg-secondary border-secondary/5 dark:border-white/5 shadow-card",
    glass: "glass-panel shadow-glass",
    outline: "bg-transparent border-secondary/10 dark:border-white/10",
  };

  return (
    <div
      className={`
        rounded-none transition-shadow
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {(title || action) && (
        <div
          className={`flex justify-between items-center ${padding ? "p-6" : "px-6 py-4"} border-b border-secondary/5 dark:border-white/5`}
        >
          <div>
            {title && (
              <h3 className="text-xl font-bold text-secondary dark:text-background-light">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-base text-secondary/60 dark:text-background-light/60">
                {subtitle}
              </p>
            )}
          </div>
          {action}
        </div>
      )}
      <div className={padding ? "p-6" : ""}>{children}</div>
    </div>
  );
};

export default Card;
