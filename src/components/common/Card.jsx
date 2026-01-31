const Card = ({
  children,
  title,
  subtitle,
  action,
  className = "",
  padding = true,
  ...props
}) => {
  return (
    <div
      className={`
        bg-white dark:bg-[#1a2332] rounded-xl border border-[#f0f2f4] dark:border-gray-800
        shadow-sm hover:shadow-md transition-shadow
        ${className}
      `}
      {...props}
    >
      {(title || action) && (
        <div
          className={`flex justify-between items-center ${padding ? "p-6" : "px-6 py-4"} border-b border-[#f0f2f4] dark:border-gray-800`}
        >
          <div>
            {title && (
              <h3 className="text-lg font-bold text-[#111318] dark:text-white">
                {title}
              </h3>
            )}
            {subtitle && <p className="text-sm text-[#617089]">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={padding ? "p-6" : ""}>{children}</div>
    </div>
  );
};

export default Card;
