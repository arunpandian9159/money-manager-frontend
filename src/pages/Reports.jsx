import { useState, useEffect } from "react";
import { format, subMonths } from "date-fns";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { Card, Select, StatCard } from "../components/common";
import { reportsAPI } from "../api";
import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Percent,
  ChevronDown,
  ChevronUp,
  Fuel,
  Utensils,
  Gamepad2,
  Stethoscope,
  Bus,
  CreditCard,
  ShoppingBag,
  Zap,
  GraduationCap,
  MoreHorizontal,
} from "lucide-react";

const CATEGORY_ICONS = {
  fuel: Fuel,
  food: Utensils,
  entertainment: Gamepad2,
  medical: Stethoscope,
  transportation: Bus,
  loan_emi: CreditCard,
  shopping: ShoppingBag,
  utilities: Zap,
  education: GraduationCap,
  others: MoreHorizontal,
};

const COLORS = [
  "#D65A31", // Terracotta
  "#0A192F", // Navy
  "#81B29A", // Sage
  "#E47F5C", // Terracotta Light
  "#1E293B", // Navy Light
  "#5A8C73", // Sage Dark
  "#B84825", // Terracotta Dark
];

const Reports = () => {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpenses: 0 });
  const [categoryData, setCategoryData] = useState([]);
  const [divisionData, setDivisionData] = useState([]);
  const [trendsData, setTrendsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("6");
  const [dateRange, setDateRange] = useState({
    startDate: format(subMonths(new Date(), 6), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  });
  const [sortConfig, setSortConfig] = useState({
    key: "total",
    direction: "desc",
  });

  useEffect(() => {
    fetchReportsData();
  }, [dateRange]);

  const fetchReportsData = async () => {
    try {
      setLoading(true);
      const params = {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        groupBy: "month",
      };
      const [summaryRes, categoryRes, divisionRes, trendsRes] =
        await Promise.all([
          reportsAPI.getSummary(params),
          reportsAPI.getByCategory(params),
          reportsAPI.getByDivision(params),
          reportsAPI.getTrends(params),
        ]);

      setSummary(
        summaryRes.data.summary || { totalIncome: 0, totalExpenses: 0 },
      );
      setCategoryData(categoryRes.data.breakdown || []);
      setDivisionData(divisionRes.data.breakdown || []);
      setTrendsData(trendsRes.data.trends || []);
    } catch (error) {
      console.error("Failed to fetch reports data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePeriodChange = (e) => {
    const months = parseInt(e.target.value);
    setSelectedPeriod(e.target.value);
    setDateRange({
      startDate: format(subMonths(new Date(), months), "yyyy-MM-dd"),
      endDate: format(new Date(), "yyyy-MM-dd"),
    });
  };

  const handleSort = (key) => {
    let direction = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  const sortedCategoryData = [...categoryData].sort((a, b) => {
    if (sortConfig.key === "percentage") {
      const aPerc = (a.total / summary.totalExpenses) * 100;
      const bPerc = (b.total / summary.totalExpenses) * 100;
      return sortConfig.direction === "asc" ? aPerc - bPerc : bPerc - aPerc;
    }

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const netBalance = summary.totalIncome - summary.totalExpenses;
  const savingsRate =
    summary.totalIncome > 0
      ? ((netBalance / summary.totalIncome) * 100).toFixed(1)
      : 0;

  // Calculate real trend data and changes
  const getTrendData = (key) => {
    return trendsData.map((d) => ({
      value: key === "net" ? d.income - d.expense : d[key],
    }));
  };

  const calculateChange = (key) => {
    if (trendsData.length < 2) return { change: 0, type: "positive" };
    const latest = trendsData[trendsData.length - 1];
    const previous = trendsData[trendsData.length - 2];

    const latestVal =
      key === "net" ? latest.income - latest.expense : latest[key];
    const previousVal =
      key === "net" ? previous.income - previous.expense : previous[key];

    if (previousVal === 0) return { change: 0, type: "positive" };

    const change = (
      ((latestVal - previousVal) / Math.abs(previousVal)) *
      100
    ).toFixed(1);
    return {
      change: Math.abs(change),
      type: change >= 0 ? "positive" : "negative",
    };
  };

  const incomeTrend = calculateChange("income");
  const expenseTrend = calculateChange("expense");
  const netTrend = calculateChange("net");

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-secondary/5 dark:border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <span className="h-[1px] w-8 bg-primary"></span>
            <span className="font-mono text-[10px] text-primary uppercase tracking-widest">
              Analytical Intelligence
            </span>
          </div>
          <h1 className="text-4xl font-bold text-secondary dark:text-background-light uppercase tracking-tight">
            Financial Report
          </h1>
          <p className="font-serif italic text-secondary/60 dark:text-background-light/60 mt-2">
            Deep-dive metrics for the selected temporal window.
          </p>
        </div>
        <Select
          options={[
            { value: "1", label: "Monthly Cycle" },
            { value: "3", label: "Quarterly View" },
            { value: "6", label: "Biannum Insight" },
            { value: "12", label: "Annual Summary" },
          ]}
          value={selectedPeriod}
          onChange={handlePeriodChange}
          className="w-56"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Income"
          value={`₹${summary.totalIncome?.toLocaleString() || 0}`}
          iconColor="green"
          change={incomeTrend.change}
          changeType={incomeTrend.type}
          trendData={getTrendData("income")}
        />
        <StatCard
          title="Total Expenses"
          value={`₹${summary.totalExpenses?.toLocaleString() || 0}`}
          iconColor="red"
          change={expenseTrend.change}
          changeType={expenseTrend.type}
          trendData={getTrendData("expense")}
        />
        <StatCard
          title="Net Savings"
          value={`₹${netBalance.toLocaleString()}`}
          iconColor={netBalance >= 0 ? "green" : "red"}
          change={netTrend.change}
          changeType={netTrend.type}
          trendData={getTrendData("net")}
        />
        <StatCard
          title="Savings Rate"
          value={`${savingsRate}%`}
          iconColor="blue"
          change={netTrend.change} // Using net trend for savings rate as well
          changeType={netTrend.type}
          trendData={getTrendData("net")}
        />
      </div>

      {/* Category and Division Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense by Category */}
        <Card title="Expenses by Category">
          <div className="h-72">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="total"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    label={({ name, percent }) => {
                      if (!name) return "";
                      const formattedName = name.replace("_", " ");
                      const capitalized =
                        formattedName.charAt(0).toUpperCase() +
                        formattedName.slice(1);
                      return `${capitalized} (${(percent * 100).toFixed(0)}%)`;
                    }}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `₹${value.toLocaleString()}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-[#617089]">
                No category data available
              </div>
            )}
          </div>
        </Card>

        {/* Division Comparison */}
        <Card title="Office vs Personal Spending">
          <div className="h-72">
            {divisionData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={divisionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    type="number"
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                  />
                  <YAxis type="category" dataKey="_id" />
                  <Tooltip
                    formatter={(value) => `₹${value.toLocaleString()}`}
                  />
                  <Legend />
                  <Bar
                    dataKey="income"
                    fill="#10B981"
                    name="Income"
                    radius={[0, 4, 4, 0]}
                  />
                  <Bar
                    dataKey="expense"
                    fill="#EF4444"
                    name="Expense"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-[#617089]">
                No division data available
              </div>
            )}
          </div>
        </Card>
      </div>
      
{/* Trends Chart */}
      <Card
        title="Flow Velocity"
        subtitle="Temporal trend of capital inflow vs outflow"
      >
        <div className="h-80">
          {trendsData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendsData}>
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fontFamily: "JetBrains Mono",
                    fill: "#0A192F66",
                  }}
                  tickFormatter={(value) =>
                    format(new Date(value + "-01"), "MMM yy")
                  }
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fontFamily: "JetBrains Mono",
                    fill: "#0A192F66",
                  }}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0A192F",
                    border: "none",
                    borderRadius: "0",
                    color: "#F9F8F4",
                    fontFamily: "JetBrains Mono",
                    fontSize: "10px",
                  }}
                  formatter={(value) => `₹${value.toLocaleString()}`}
                  labelFormatter={(label) =>
                    format(new Date(label + "-01"), "MMMM yyyy")
                  }
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#81B29A"
                  strokeWidth={3}
                  name="Inflow"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#D65A31"
                  strokeWidth={3}
                  name="Outflow"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full font-mono text-[10px] uppercase tracking-widest text-secondary/40">
              No trend data available
            </div>
          )}
        </div>
      </Card>

      {/* Category Breakdown Table */}
      <Card title="Category Breakdown">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f0f2f4] dark:border-gray-800">
                {[
                  { key: "_id", label: "Category", align: "left" },
                  { key: "total", label: "Amount", align: "right" },
                  { key: "count", label: "Transactions", align: "right" },
                  { key: "percentage", label: "% of Total", align: "right" },
                  {
                    key: "progress",
                    label: "Progress",
                    align: "left",
                    noSort: true,
                  },
                ].map((column) => (
                  <th
                    key={column.key}
                    onClick={() => !column.noSort && handleSort(column.key)}
                    className={`py-3 px-4 text-sm font-medium text-[#617089] ${
                      column.align === "right" ? "text-right" : "text-left"
                    } ${!column.noSort ? "cursor-pointer hover:text-primary transition-colors" : ""}`}
                  >
                    <div
                      className={`flex items-center gap-1 ${
                        column.align === "right" ? "justify-end" : ""
                      }`}
                    >
                      {column.label}
                      {!column.noSort && sortConfig.key === column.key && (
                        <span>
                          {sortConfig.direction === "asc" ? (
                            <ChevronUp size={14} />
                          ) : (
                            <ChevronDown size={14} />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedCategoryData.length > 0 ? (
                sortedCategoryData.map((cat, index) => {
                  const percentage =
                    summary.totalExpenses > 0
                      ? ((cat.total / summary.totalExpenses) * 100).toFixed(1)
                      : 0;
                  const Icon = CATEGORY_ICONS[cat._id] || MoreHorizontal;
                  return (
                    <tr
                      key={cat._id}
                      className="border-b border-[#f0f2f4] dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                            style={{ color: COLORS[index % COLORS.length] }}
                          >
                            <Icon size={16} />
                          </div>
                          <span className="font-medium text-[#111318] dark:text-white capitalize">
                            {cat._id?.replace("_", " ")}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right text-[#111318] dark:text-white font-mono">
                        ₹{cat.total?.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-[#617089] font-mono">
                        {cat.count || 0}
                      </td>
                      <td className="py-3 px-4 text-right text-[#617089] font-mono">
                        {percentage}%
                      </td>
                      <td className="py-3 px-4 w-48">
                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-[#617089]">
                    No category data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
