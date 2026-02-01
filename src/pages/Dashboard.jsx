import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  format,
  subMonths,
  subWeeks,
  startOfWeek,
  startOfMonth,
  startOfYear,
} from "date-fns";
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
import {
  StatCard,
  Card,
  Button,
  Select,
  Modal,
  Input,
} from "../components/common";
import { transactionsAPI, reportsAPI, accountsAPI } from "../api";

const CATEGORIES = [
  { value: "fuel", label: "Fuel" },
  { value: "food", label: "Food" },
  { value: "entertainment", label: "Entertainment" },
  { value: "medical", label: "Medical" },
  { value: "transportation", label: "Transportation" },
  { value: "loan_emi", label: "Loan/EMI" },
  { value: "shopping", label: "Shopping" },
  { value: "utilities", label: "Utilities" },
  { value: "education", label: "Education" },
  { value: "others", label: "Others" },
];

const PERIOD_OPTIONS = [
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "3months", label: "Last 3 Months" },
  { value: "year", label: "This Year" },
  { value: "all", label: "All Time" },
];

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
  const [period, setPeriod] = useState("3months");
  const [accounts, setAccounts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    description: "",
    category: "others",
    division: "personal",
    date: format(new Date(), "yyyy-MM-dd"),
    time: format(new Date(), "HH:mm"),
    account: "",
  });
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  // Calculate date range based on selected period
  const getDateRange = (periodValue) => {
    const today = new Date();
    let startDate = null;
    const endDate = format(today, "yyyy-MM-dd");

    switch (periodValue) {
      case "week":
        startDate = format(
          startOfWeek(today, { weekStartsOn: 1 }),
          "yyyy-MM-dd",
        );
        break;
      case "month":
        startDate = format(startOfMonth(today), "yyyy-MM-dd");
        break;
      case "3months":
        startDate = format(subMonths(today, 3), "yyyy-MM-dd");
        break;
      case "year":
        startDate = format(startOfYear(today), "yyyy-MM-dd");
        break;
      case "all":
      default:
        return {}; // No date filtering for "all time"
    }

    return { startDate, endDate };
  };

  useEffect(() => {
    fetchDashboardData();
    fetchAccounts();
  }, [period]);

  const fetchAccounts = async () => {
    try {
      const res = await accountsAPI.getAll();
      setAccounts(res.data.accounts || []);
    } catch (err) {
      console.error("Failed to fetch accounts:", err);
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const dateParams = getDateRange(period);

      const [summaryRes, transactionsRes, categoryRes, divisionRes] =
        await Promise.all([
          reportsAPI.getSummary(dateParams),
          transactionsAPI.getAll({
            limit: 5,
            sortBy: "createdAt",
            sortOrder: "desc",
            ...dateParams,
          }),
          reportsAPI.getByCategory(dateParams),
          reportsAPI.getByDivision(dateParams),
        ]);

      setSummary(summaryRes.data.summary);
      setRecentTransactions(transactionsRes.data.transactions || []);
      setCategoryData(categoryRes.data.breakdown || []);
      setDivisionData(divisionRes.data.breakdown || []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setFormData({
      type: "expense",
      amount: "",
      description: "",
      category: "others",
      division: "personal",
      date: format(new Date(), "yyyy-MM-dd"),
      time: format(new Date(), "HH:mm"),
      account: accounts[0]?._id || "",
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) {
      setFormError("Please fill all required fields");
      return;
    }
    setSaving(true);
    try {
      const dateTime = new Date(`${formData.date}T${formData.time || "00:00"}`);
      const data = {
        ...formData,
        amount: parseFloat(formData.amount),
        date: dateTime.toISOString(),
      };
      delete data.time;
      await transactionsAPI.create(data);
      setModalOpen(false);
      fetchDashboardData();
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to save transaction");
    } finally {
      setSaving(false);
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111318] dark:text-white">
            Dashboard
          </h1>
          <p className="text-[#617089] mt-1">
            Welcome back! Here's your financial overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select
            options={PERIOD_OPTIONS}
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-40"
          />
          <Button icon="add" onClick={openAddModal}>
            Add Transaction
          </Button>
        </div>
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
                    label={({ name, percent }) => {
                      if (!name) return "";
                      const formattedName = name.replace("_", " ");
                      const capitalized =
                        formattedName.charAt(0).toUpperCase() +
                        formattedName.slice(1);
                      return `${capitalized} ${(percent * 100).toFixed(0)}%`;
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

      {/* Add Transaction Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Transaction"
      >
        {formError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {formError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={formData.type === "expense"}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-4 h-4 accent-red-500"
              />
              <span className="text-red-600 font-medium">Expense</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="income"
                checked={formData.type === "income"}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-4 h-4 accent-green-500"
              />
              <span className="text-green-600 font-medium">Income</span>
            </label>
          </div>
          <Input
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            placeholder="0.00"
            required
          />
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="What was this for?"
            maxLength={100}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              options={CATEGORIES}
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
            <Select
              label="Division"
              options={[
                { value: "personal", label: "Personal" },
                { value: "office", label: "Office" },
              ]}
              value={formData.division}
              onChange={(e) =>
                setFormData({ ...formData, division: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
            <Input
              label="Time"
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
            />
            <Select
              label="Account"
              options={accounts.map((a) => ({ value: a._id, label: a.name }))}
              value={formData.account}
              onChange={(e) =>
                setFormData({ ...formData, account: e.target.value })
              }
            />
          </div>
          <div className="flex gap-3 mt-4">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" fullWidth loading={saving}>
              Add Transaction
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;
