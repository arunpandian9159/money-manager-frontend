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

const COLORS = [
  "#1d69ed",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
  "#F97316",
  "#6366F1",
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

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#111318] dark:text-white">
            Reports & Analytics
          </h1>
          <p className="text-[#617089] mt-1">
            Analyze your spending patterns and trends
          </p>
        </div>
        <Select
          options={[
            { value: "1", label: "Last Month" },
            { value: "3", label: "Last 3 Months" },
            { value: "6", label: "Last 6 Months" },
            { value: "12", label: "Last Year" },
          ]}
          value={selectedPeriod}
          onChange={handlePeriodChange}
          className="w-48"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Income"
          value={`₹${summary.totalIncome?.toLocaleString() || 0}`}
          icon="trending_up"
          iconColor="green"
        />
        <StatCard
          title="Total Expenses"
          value={`₹${summary.totalExpenses?.toLocaleString() || 0}`}
          icon="trending_down"
          iconColor="red"
        />
        <StatCard
          title="Net Savings"
          value={`₹${netBalance.toLocaleString()}`}
          icon="savings"
          iconColor={netBalance >= 0 ? "green" : "red"}
        />
        <StatCard
          title="Savings Rate"
          value={`${savingsRate}%`}
          icon="percent"
          iconColor="blue"
        />
      </div>

      {/* Trends Chart */}
      <Card title="Income vs Expenses Trend">
        <div className="h-80">
          {trendsData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) =>
                    format(new Date(value + "-01"), "MMM yyyy")
                  }
                />
                <YAxis
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value) => `₹${value.toLocaleString()}`}
                  labelFormatter={(label) =>
                    format(new Date(label + "-01"), "MMMM yyyy")
                  }
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Income"
                  dot={{ fill: "#10B981" }}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#EF4444"
                  strokeWidth={2}
                  name="Expenses"
                  dot={{ fill: "#EF4444" }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-[#617089]">
              No trend data available
            </div>
          )}
        </div>
      </Card>

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

      {/* Category Breakdown Table */}
      <Card title="Category Breakdown">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f0f2f4] dark:border-gray-800">
                <th className="text-left py-3 px-4 text-sm font-medium text-[#617089]">
                  Category
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#617089]">
                  Amount
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#617089]">
                  % of Total
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#617089]">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody>
              {categoryData.length > 0 ? (
                categoryData.map((cat, index) => {
                  const percentage =
                    summary.totalExpenses > 0
                      ? ((cat.total / summary.totalExpenses) * 100).toFixed(1)
                      : 0;
                  return (
                    <tr
                      key={cat._id}
                      className="border-b border-[#f0f2f4] dark:border-gray-800"
                    >
                      <td className="py-3 px-4 font-medium text-[#111318] dark:text-white capitalize">
                        {cat._id?.replace("_", " ")}
                      </td>
                      <td className="py-3 px-4 text-right text-[#111318] dark:text-white">
                        ₹{cat.total?.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-[#617089]">
                        {percentage}%
                      </td>
                      <td className="py-3 px-4 w-48">
                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
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
                  <td colSpan="4" className="py-8 text-center text-[#617089]">
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
