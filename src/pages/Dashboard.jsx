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
import TransactionModal from "../components/transactions/TransactionModal";
import { transactionsAPI, reportsAPI, accountsAPI } from "../api";
import {
  Fuel,
  Utensils,
  Film,
  Activity,
  Car,
  HandCoins,
  ShoppingBag,
  Zap,
  GraduationCap,
  MoreHorizontal,
  Plus,
  TrendingUp,
  TrendingDown,
  Landmark,
  ListOrdered,
  Receipt,
} from "lucide-react";

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
  fuel: Fuel,
  food: Utensils,
  entertainment: Film,
  medical: Activity,
  transportation: Car,
  loan_emi: HandCoins,
  shopping: ShoppingBag,
  utilities: Zap,
  education: GraduationCap,
  others: MoreHorizontal,
};

const CATEGORY_COLORS = {
  fuel: "#FF5252",
  food: "#FFB300",
  entertainment: "#7C4DFF",
  medical: "#00E676",
  transportation: "#40C4FF",
  loan_emi: "#FF4081",
  shopping: "#FFD740",
  utilities: "#64FFDA",
  education: "#536DFE",
  others: "#90A4AE",
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
    setModalOpen(true);
  };

  const handleTransactionSubmit = () => {
    fetchDashboardData();
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
    <div className="flex flex-col gap-9">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-secondary/5 dark:border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <span className="h-[1px] w-8 bg-primary"></span>
            <span className="font-mono text-[12px] text-primary uppercase tracking-widest">
              Executive Overview
            </span>
          </div>
          <h1 className="text-4xl font-bold text-secondary dark:text-background-light uppercase tracking-tight">
            Dashboard
          </h1>
          <p className="font-serif italic text-lg text-secondary/60 dark:text-background-light/60 mt-2">
            Welcome back. Here is the current state of your capital.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select
            options={PERIOD_OPTIONS}
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-48"
          />
          <Button icon={Plus} onClick={openAddModal}>
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Income"
          value={`₹${summary.totalIncome?.toLocaleString() || 0}`}
          icon={TrendingUp}
          iconColor="green"
        />
        <StatCard
          title="Total Expenses"
          value={`₹${summary.totalExpenses?.toLocaleString() || 0}`}
          icon={TrendingDown}
          iconColor="red"
        />
        <StatCard
          title="Net Balance"
          value={`₹${netBalance.toLocaleString()}`}
          icon={Landmark}
          iconColor={netBalance >= 0 ? "green" : "red"}
        />
        <StatCard
          title="Transactions"
          value={summary.transactionCount || 0}
          icon={ListOrdered}
          iconColor="blue"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense by Category */}
        <Card
          title="Capital Distribution"
          subtitle="Allocation by primary category"
        >
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
                    outerRadius={90}
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
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0A192F",
                      border: "none",
                      borderRadius: "0",
                      color: "#F9F8F4",
                      fontFamily: "JetBrains Mono",
                      fontSize: "10px",
                    }}
                    itemStyle={{ color: "#F9F8F4" }}
                    formatter={(value) => `₹${value.toLocaleString()}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full font-mono text-[12px] uppercase tracking-widest text-secondary/40">
                Data non-existent
              </div>
            )}
          </div>
        </Card>

        {/* Division Comparison */}
        <Card
          title="Divisional Velocity"
          subtitle="Comparative analysis: Office vs Personal"
        >
          <div className="h-72">
            {divisionData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={divisionData} barGap={8}>
                  <XAxis
                    dataKey="_id"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fontFamily: "JetBrains Mono",
                      fill: "#0A192F66",
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fontFamily: "JetBrains Mono",
                      fill: "#0A192F66",
                    }}
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      backgroundColor: "#0A192F",
                      border: "none",
                      borderRadius: "0",
                      color: "#F9F8F4",
                      fontFamily: "JetBrains Mono",
                      fontSize: "12px",
                    }}
                    formatter={(value) => `₹${value.toLocaleString()}`}
                  />
                  <Bar
                    dataKey="income"
                    fill="#81B29A"
                    name="Inflow"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="expense"
                    fill="#D65A31"
                    name="Outflow"
                    radius={[0, 0, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full font-mono text-[10px] uppercase tracking-widest text-secondary/40">
                Data non-existent
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
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-secondary/5 dark:border-white/5">
                <th className="py-4 px-6 font-mono text-[12px] uppercase tracking-widest text-secondary/40">
                  Description
                </th>
                <th className="py-4 px-6 font-mono text-[12px] uppercase tracking-widest text-secondary/40">
                  Type
                </th>
                <th className="py-4 px-6 font-mono text-[12px] uppercase tracking-widest text-secondary/40">
                  Domain
                </th>
                <th className="py-4 px-6 font-mono text-[12px] uppercase tracking-widest text-secondary/40">
                  Sector
                </th>
                <th className="py-4 px-6 font-mono text-[12px] uppercase tracking-widest text-secondary/40">
                  Temporal
                </th>
                <th className="py-4 px-6 font-mono text-[12px] uppercase tracking-widest text-secondary/40 text-right">
                  Magnitude
                </th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.length > 0 ? (
                recentTransactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="border-b border-secondary/5 dark:border-white/5 hover:bg-secondary/5 dark:hover:bg-white/5 transition-colors group"
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <span className="font-serif italic text-xl text-secondary dark:text-background-light">
                          {tx.description}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span
                        className={`px-2 py-1 rounded-none text-[12px] font-mono uppercase tracking-widest ${
                          tx.type === "income"
                            ? "bg-success/10 text-success"
                            : "bg-danger/10 text-danger"
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-5 px-6 font-mono text-[13px] uppercase tracking-wider text-secondary/60 dark:text-background-light/60">
                      <div className="flex items-center gap-2">
                        {CATEGORY_ICONS[tx.category] ? (
                          (() => {
                            const Icon = CATEGORY_ICONS[tx.category];
                            return (
                              <Icon
                                size={18}
                                style={{
                                  color:
                                    CATEGORY_COLORS[tx.category] || "#90A4AE",
                                }}
                                strokeWidth={1.5}
                              />
                            );
                          })()
                        ) : (
                          <Receipt
                            size={18}
                            className="text-secondary/40"
                            strokeWidth={1.5}
                          />
                        )}
                        {tx.category?.replace("_", " ")}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span
                        className={`px-2 py-1 rounded-none text-[12px] font-mono uppercase tracking-widest ${tx.division === "office" ? "bg-secondary text-background-light" : "bg-accent text-white"}`}
                      >
                        {tx.division === "office" ? "Office" : "Personal"}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <div className="font-mono text-[13px] text-secondary/60 dark:text-background-light/60">
                        {format(new Date(tx.date), "MMM dd, yyyy")}
                      </div>
                      <div className="font-mono text-[11px] text-secondary/40 dark:text-background-light/40 mt-1">
                        {format(new Date(tx.date), "HH:mm")}
                      </div>
                    </td>
                    <td
                      className={`py-5 px-6 text-right font-serif text-2xl ${tx.type === "income" ? "text-success" : "text-secondary dark:text-background-light"}`}
                    >
                      {tx.type === "income" ? "+" : "-"}₹
                      {tx.amount?.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center font-mono text-[12px] uppercase tracking-widest text-secondary/40"
                  >
                    No records found in this domain
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Transaction Modal */}
      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleTransactionSubmit}
        accounts={accounts}
      />
    </div>
  );
};

export default Dashboard;
