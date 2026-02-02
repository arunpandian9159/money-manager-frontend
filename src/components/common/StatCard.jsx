import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const trendColors = {
  green: {
    stroke: "#10B981",
    fill: "url(#colorGreen)",
    gradient: "#10B981",
  },
  red: {
    stroke: "#EF4444",
    fill: "url(#colorRed)",
    gradient: "#EF4444",
  },
  blue: {
    stroke: "#3B82F6",
    fill: "url(#colorBlue)",
    gradient: "#3B82F6",
  },
};

const StatCard = ({
  title,
  value,
  iconColor = "blue",
  change = 0,
  changeType = "positive",
  trendData = [],
}) => {
  const color = trendColors[iconColor] || trendColors.blue;
  const gradientId = `color${iconColor}`;

  return (
    <div className="bg-white dark:bg-secondary p-6 rounded-2xl border border-secondary/5 dark:border-white/5 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-secondary/50 dark:text-background-light/40 text-sm font-medium mb-1 uppercase tracking-tight">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-secondary dark:text-background-light tracking-tight">
            {value}
          </h3>
        </div>

        {change !== undefined && (
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
              changeType === "positive"
                ? "bg-success/10 text-success"
                : "bg-danger/10 text-danger"
            }`}
          >
            {changeType === "positive" ? (
              <TrendingUp size={12} strokeWidth={3} />
            ) : (
              <TrendingDown size={12} strokeWidth={3} />
            )}
            {change}%
          </div>
        )}
      </div>

      <div className="h-16 w-[calc(100%+3rem)] -ml-6 -mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={
              trendData.length > 0 ? trendData : [{ value: 0 }, { value: 0 }]
            }
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color.stroke} stopOpacity={0.6} />
                <stop offset="95%" stopColor={color.stroke} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color.stroke}
              strokeWidth={3}
              fill={`url(#${gradientId})`}
              fillOpacity={1}
              isAnimationActive={true}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatCard;
