const iconColors = {
  green: "bg-success/10 text-success",
  red: "bg-danger/10 text-danger",
  blue: "bg-secondary/5 text-secondary dark:text-background-light",
  orange: "bg-primary/10 text-primary",
};

const StatCard = ({
  title,
  value,
  icon,
  iconColor = "blue",
  change,
  changeType = "positive",
}) => {
  return (
    <div className="bg-white dark:bg-secondary p-6 border border-secondary/5 dark:border-white/5 shadow-card hover:shadow-editorial transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div
          className={`p-2 rounded-none transition-colors ${iconColors[iconColor]}`}
        >
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
        {change !== undefined && (
          <span
            className={`
            font-mono text-[10px] font-bold tracking-widest uppercase
            ${changeType === "positive" ? "text-success" : "text-danger"}
          `}
          >
            {changeType === "positive" ? "↑" : "↓"} {change}%
          </span>
        )}
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-secondary/50 dark:text-background-light/40 mb-2 group-hover:text-primary transition-colors">
          {title}
        </p>
        <h3 className="text-3xl font-serif text-secondary dark:text-background-light leading-none">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default StatCard;
