const iconColors = {
  green: "bg-success/10 text-success",
  red: "bg-danger/10 text-danger",
  blue: "bg-secondary/5 text-secondary dark:text-background-light",
  orange: "bg-primary/10 text-primary",
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconColor = "blue",
  change,
  changeType = "positive",
}) => {
  return (
    <div className="bg-white dark:bg-secondary p-5 border border-secondary/5 dark:border-white/5 shadow-card hover:shadow-editorial transition-all group">
      <div className="flex items-center gap-4">
        {/* Left Column: Icon */}
        <div
          className={`p-3 rounded-none transition-colors shrink-0 ${iconColors[iconColor]}`}
        >
          {Icon && <Icon size={24} strokeWidth={1.5} />}
        </div>

        {/* Right Column: Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="min-w-0 truncate">
              <p className="font-mono text-[12px] uppercase tracking-widest text-secondary/50 dark:text-background-light/40 group-hover:text-primary transition-colors mb-1 truncate">
                {title}
              </p>
              <h3 className="text-2xl font-serif text-secondary dark:text-background-light leading-none truncate">
                {value}
              </h3>
            </div>

            {change !== undefined && (
              <span
                className={`
                shrink-0 font-mono text-[11px] font-bold tracking-widest uppercase mt-0.5
                ${changeType === "positive" ? "text-success" : "text-danger"}
              `}
              >
                {changeType === "positive" ? "↑" : "↓"} {change}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
