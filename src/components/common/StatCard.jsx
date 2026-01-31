const iconColors = {
  green: "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400",
  red: "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400",
  blue: "bg-blue-50 dark:bg-blue-500/10 text-primary dark:text-blue-400",
  orange: "bg-orange-50 dark:bg-orange-500/10 text-orange-500",
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
    <div className="bg-white dark:bg-[#1a2332] rounded-xl p-6 border border-[#f0f2f4] dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${iconColors[iconColor]}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {change !== undefined && (
          <span
            className={`
            flex items-center text-xs font-bold px-2 py-1 rounded-full
            ${
              changeType === "positive"
                ? "text-green-600 bg-green-50 dark:bg-green-500/10"
                : "text-red-600 bg-red-50 dark:bg-red-500/10"
            }
          `}
          >
            {changeType === "positive" ? "+" : ""}
            {change}%
          </span>
        )}
      </div>
      <p className="text-[#617089] text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-[#111318] dark:text-white tracking-tight">
        {value}
      </h3>
    </div>
  );
};

export default StatCard;
