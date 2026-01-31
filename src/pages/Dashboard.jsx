import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
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
} from "recharts";
import { StatCard, Card, Button } from "../components/common";
import { transactionsAPI, reportsAPI } from "../api";

const CATEGORY_ICONS = {
  fuel: "local_gas_station",
  food: "restaurant",
  entertainment: "movie",
  medical: "medical_services",
  transportation: "directions_car",
  loan_emi: "payments",
  shopping: "shopping_bag",
  utilities: "bolt",
  education: "school",
  others: "more_horiz",
};

const COLORS = [
  "#1d69ed",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
];

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    transactionCount: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [divisionData, setDivisionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [summaryRes, transactionsRes, categoryRes, divisionRes] =
        await Promise.all([
          reportsAPI.getSummary(),
          transactionsAPI.getAll({
            limit: 5,
            sortBy: "createdAt",
            sortOrder: "desc",
          }),
          reportsAPI.getByCategory(),
          reportsAPI.getByDivision(),
        ]);

      setSummary(summaryRes.data);
      setRecentTransactions(transactionsRes.data.transactions || []);
      setCategoryData(categoryRes.data.categories || []);
      setDivisionData(divisionRes.data.divisions || []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const netBalance = summary.totalIncome - summary.totalExpenses;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#111318] dark:text-white">
            Dashboard
          </h1>
          <p className="text-[#617089] mt-1">
            Welcome back! Here's your financial overview.
          </p>
        </div>
        <Link to="/transactions">
          <Button icon="add">Add Transaction</Button>
        </Link>
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
          title="Net Balance"
          value={`₹${netBalance.toLocaleString()}`}
          icon="account_balance"
          iconColor={netBalance >= 0 ? "green" : "red"}
        />
        <StatCard
          title="Transactions"
          value={summary.transactionCount || 0}
          icon="receipt_long"
          iconColor="blue"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense by Category */}
        <Card title="Expenses by Category">
          <div className="h-64">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="total"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ _id, percent }) =>
                      `${_id} ${(percent * 100).toFixed(0)}%`
                    }
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
                No data available
              </div>
            )}
          </div>
        </Card>

        {/* Division Comparison */}
        <Card title="Office vs Personal">
          <div className="h-64">
            {divisionData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={divisionData}>
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => `₹${value.toLocaleString()}`}
                  />
                  <Legend />
                  <Bar dataKey="income" fill="#10B981" name="Income" />
                  <Bar dataKey="expense" fill="#EF4444" name="Expense" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-[#617089]">
                No data available
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card
        title="Recent Transactions"
        action={
          <Link
            to="/transactions"
            className="text-primary text-sm font-medium hover:underline"
          >
            View All
          </Link>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f0f2f4] dark:border-gray-800">
                <th className="text-left py-3 px-4 text-sm font-medium text-[#617089]">
                  Description
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#617089]">
                  Category
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#617089]">
                  Division
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#617089]">
                  Date
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#617089]">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.length > 0 ? (
                recentTransactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="border-b border-[#f0f2f4] dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`material-symbols-outlined p-2 rounded-lg ${tx.type === "income" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
                        >
                          {CATEGORY_ICONS[tx.category] || "receipt"}
                        </span>
                        <span className="font-medium text-[#111318] dark:text-white">
                          {tx.description}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#617089] capitalize">
                      {tx.category?.replace("_", " ")}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${tx.division === "office" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}
                      >
                        {tx.division}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#617089]">
                      {format(new Date(tx.date), "MMM dd, yyyy")}
                    </td>
                    <td
                      className={`py-3 px-4 text-right font-bold ${tx.type === "income" ? "text-green-600" : "text-[#111318] dark:text-white"}`}
                    >
                      {tx.type === "income" ? "+" : "-"}₹
                      {tx.amount?.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-[#617089]">
                    No transactions yet. Add your first transaction!
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

export default Dashboard;
