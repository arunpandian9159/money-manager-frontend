import { useState, useEffect } from "react";
import { format, differenceInHours } from "date-fns";
import { Button, Card, Modal, Input, Select } from "../components/common";
import { transactionsAPI, accountsAPI } from "../api";

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

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filters, setFilters] = useState({
    type: "",
    division: "",
    category: "",
    search: "",
    startDate: "",
    endDate: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 100,
    total: 0,
  });
  const [sort, setSort] = useState({
    field: "date",
    order: "desc",
  });
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

  useEffect(() => {
    fetchTransactions();
    fetchAccounts();
  }, [filters, pagination.page, sort]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        sortBy: sort.field,
        sortOrder: sort.order,
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v)),
      };
      const res = await transactionsAPI.getAll(params);
      setTransactions(res.data.transactions || []);
      setPagination((prev) => ({
        ...prev,
        total: res.data.pagination?.total || 0,
      }));
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAccounts = async () => {
    try {
      const res = await accountsAPI.getAll();
      setAccounts(res.data.accounts || []);
    } catch (err) {
      console.error("Failed to fetch accounts:", err);
    }
  };

  const canEdit = (tx) =>
    differenceInHours(new Date(), new Date(tx.createdAt)) < 12;

  const handleSort = (field) => {
    setSort((prev) => ({
      field,
      order: prev.field === field && prev.order === "desc" ? "asc" : "desc",
    }));
  };

  const openAddModal = () => {
    setSelectedTransaction(null);
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

  const openEditModal = (tx) => {
    if (!canEdit(tx)) {
      alert("Transactions can only be edited within 12 hours of creation");
      return;
    }
    setSelectedTransaction(tx);
    setFormData({
      type: tx.type,
      amount: tx.amount.toString(),
      description: tx.description,
      category: tx.category,
      division: tx.division,
      date: format(new Date(tx.date), "yyyy-MM-dd"),
      time: format(new Date(tx.date), "HH:mm"),
      account: tx.account?._id || tx.account || "",
    });
    setFormError("");
    setModalOpen(true);
  };

  const openDeleteModal = (tx) => {
    setSelectedTransaction(tx);
    setDeleteModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) {
      setFormError("Please fill all required fields");
      return;
    }
    setSaving(true);
    try {
      // Combine date and time into a single ISO date string
      const dateTime = new Date(`${formData.date}T${formData.time || "00:00"}`);
      const data = {
        ...formData,
        amount: parseFloat(formData.amount),
        date: dateTime.toISOString(),
      };
      delete data.time; // Remove time field as it's now part of date
      if (selectedTransaction)
        await transactionsAPI.update(selectedTransaction._id, data);
      else await transactionsAPI.create(data);
      setModalOpen(false);
      fetchTransactions();
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to save transaction");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await transactionsAPI.delete(selectedTransaction._id);
      setDeleteModalOpen(false);
      fetchTransactions();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete transaction");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-secondary/5 dark:border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <span className="h-[1px] w-8 bg-primary"></span>
            <span className="font-mono text-[10px] text-primary uppercase tracking-widest">
              Ledger Management
            </span>
          </div>
          <h1 className="text-4xl font-bold text-secondary dark:text-background-light uppercase tracking-tight">
            Transactions
          </h1>
          <p className="font-serif italic text-secondary/60 dark:text-background-light/60 mt-2">
            A comprehensive record of your capital movement.
          </p>
        </div>
        <Button icon="add" onClick={openAddModal}>
          Add Transaction
        </Button>
      </div>

      {/* Filters */}
      <Card padding={false} variant="outline" className="bg-transparent">
        <div className="flex flex-wrap gap-6 p-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary/40">
              Classification
            </span>
            <Select
              options={[
                { value: "", label: "All Flows" },
                { value: "income", label: "Inflow" },
                { value: "expense", label: "Outflow" },
              ]}
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="w-48"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary/40">
              Division
            </span>
            <Select
              options={[
                { value: "", label: "All Sectors" },
                { value: "office", label: "Office" },
                { value: "personal", label: "Personal" },
              ]}
              value={filters.division}
              onChange={(e) =>
                setFilters({ ...filters, division: e.target.value })
              }
              className="w-48"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary/40">
              Category
            </span>
            <Select
              options={[{ value: "", label: "All Domains" }, ...CATEGORIES]}
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="w-48"
            />
          </div>
          <div className="flex items-end gap-3">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondary/40">
                Temporal Range
              </span>
              <div className="flex items-center gap-2">
                <Input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) =>
                    setFilters({ ...filters, startDate: e.target.value })
                  }
                  className="w-40"
                />
                <span className="text-secondary/20">/</span>
                <Input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) =>
                    setFilters({ ...filters, endDate: e.target.value })
                  }
                  className="w-40"
                />
              </div>
            </div>
            {(filters.startDate || filters.endDate) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setFilters({ ...filters, startDate: "", endDate: "" })
                }
              >
                Reset Temporal
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card padding={false} className="overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-none h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-secondary/5 dark:border-white/5">
                  <th
                    className="py-4 px-6 font-mono text-[10px] uppercase tracking-widest text-secondary/40 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleSort("description")}
                  >
                    <div className="flex items-center gap-1">
                      Description
                      {sort.field === "description" && (
                        <span className="material-symbols-outlined text-[14px]">
                          {sort.order === "asc"
                            ? "arrow_upward"
                            : "arrow_downward"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className="py-4 px-6 font-mono text-[10px] uppercase tracking-widest text-secondary/40 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleSort("type")}
                  >
                    <div className="flex items-center gap-1">
                      Type
                      {sort.field === "type" && (
                        <span className="material-symbols-outlined text-[14px]">
                          {sort.order === "asc"
                            ? "arrow_upward"
                            : "arrow_downward"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className="py-4 px-6 font-mono text-[10px] uppercase tracking-widest text-secondary/40 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleSort("category")}
                  >
                    <div className="flex items-center gap-1">
                      Domain
                      {sort.field === "category" && (
                        <span className="material-symbols-outlined text-[14px]">
                          {sort.order === "asc"
                            ? "arrow_upward"
                            : "arrow_downward"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className="py-4 px-6 font-mono text-[10px] uppercase tracking-widest text-secondary/40 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleSort("division")}
                  >
                    <div className="flex items-center gap-1">
                      Sector
                      {sort.field === "division" && (
                        <span className="material-symbols-outlined text-[14px]">
                          {sort.order === "asc"
                            ? "arrow_upward"
                            : "arrow_downward"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className="py-4 px-6 font-mono text-[10px] uppercase tracking-widest text-secondary/40 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center gap-1">
                      Temporal
                      {sort.field === "date" && (
                        <span className="material-symbols-outlined text-[14px]">
                          {sort.order === "asc"
                            ? "arrow_upward"
                            : "arrow_downward"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className="py-4 px-6 font-mono text-[10px] uppercase tracking-widest text-secondary/40 text-right cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleSort("amount")}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Magnitude
                      {sort.field === "amount" && (
                        <span className="material-symbols-outlined text-[14px]">
                          {sort.order === "asc"
                            ? "arrow_upward"
                            : "arrow_downward"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="py-4 px-6 font-mono text-[10px] uppercase tracking-widest text-secondary/40 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <tr
                      key={tx._id}
                      className="border-b border-secondary/5 dark:border-white/5 hover:bg-secondary/5 dark:hover:bg-white/5 transition-colors group"
                    >
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <span className="font-serif italic text-lg text-secondary dark:text-background-light">
                            {tx.description}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span
                          className={`px-2 py-1 rounded-none text-[10px] font-mono uppercase tracking-widest ${
                            tx.type === "income"
                              ? "bg-success/10 text-success"
                              : "bg-danger/10 text-danger"
                          }`}
                        >
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-5 px-6 font-mono text-[11px] uppercase tracking-wider text-secondary/60 dark:text-background-light/60">
                        <div className="flex items-center gap-2">
                          <span
                            className="material-symbols-outlined text-[18px]"
                            style={{
                              color: CATEGORY_COLORS[tx.category] || "#90A4AE",
                            }}
                          >
                            {CATEGORY_ICONS[tx.category] || "receipt"}
                          </span>
                          {tx.category?.replace("_", " ")}
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span
                          className={`px-2 py-1 rounded-none text-[10px] font-mono uppercase tracking-widest ${tx.division === "office" ? "bg-secondary text-background-light" : "bg-accent text-white"}`}
                        >
                          {tx.division === "office" ? "Office" : "Personal"}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="font-mono text-[11px] text-secondary/60 dark:text-background-light/60">
                          {format(new Date(tx.date), "MMM dd, yyyy")}
                        </div>
                        <div className="font-mono text-[9px] text-secondary/40 dark:text-background-light/40 mt-1">
                          {format(new Date(tx.date), "HH:mm")}
                        </div>
                      </td>
                      <td
                        className={`py-5 px-6 text-right font-serif text-xl ${tx.type === "income" ? "text-success" : "text-secondary dark:text-background-light"}`}
                      >
                        {tx.type === "income" ? "+" : "-"}₹
                        {tx.amount?.toLocaleString()}
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {canEdit(tx) ? (
                            <button
                              onClick={() => openEditModal(tx)}
                              className="p-2 rounded-none hover:bg-secondary/10 dark:hover:bg-white/10 text-secondary/60 dark:text-background-light/60"
                              aria-label="Edit entry"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                edit
                              </span>
                            </button>
                          ) : (
                            <button
                              disabled
                              className="p-2 rounded-none opacity-30 cursor-not-allowed text-secondary/60"
                              title="Temporal window closed"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                lock
                              </span>
                            </button>
                          )}
                          <button
                            onClick={() => openDeleteModal(tx)}
                            className="p-2 rounded-none hover:bg-danger/10 text-danger"
                            aria-label="Remove entry"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-12 text-center font-mono text-[10px] uppercase tracking-widest text-secondary/40"
                    >
                      No records found in this domain
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {pagination.total > pagination.limit && (
          <div className="flex justify-center items-center gap-6 p-6 border-t border-secondary/5 dark:border-white/5 bg-secondary/5">
            <Button
              variant="ghost"
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
            >
              Previous Page
            </Button>
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary/40">
              Sequence {pagination.page}
            </span>
            <Button
              variant="ghost"
              size="sm"
              disabled={pagination.page * pagination.limit >= pagination.total}
              onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
            >
              Next Page
            </Button>
          </div>
        )}
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedTransaction ? "Edit Transaction" : "Add Transaction"}
      >
        {formError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {formError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <label
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer ${formData.type === "income" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
            >
              <input
                type="radio"
                name="type"
                value="income"
                checked={formData.type === "income"}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="hidden"
              />
              <span className="material-symbols-outlined text-green-600">
                trending_up
              </span>
              Income
            </label>
            <label
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer ${formData.type === "expense" ? "border-red-500 bg-red-50" : "border-gray-200"}`}
            >
              <input
                type="radio"
                name="type"
                value="expense"
                checked={formData.type === "expense"}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="hidden"
              />
              <span className="material-symbols-outlined text-red-600">
                trending_down
              </span>
              Expense
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
            placeholder="What's this for?"
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
              {selectedTransaction ? "Update" : "Add"} Transaction
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Transaction"
        size="sm"
      >
        <p className="text-[#617089] mb-6">
          Are you sure you want to delete this transaction? This action cannot
          be undone.
        </p>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            fullWidth
            onClick={() => setDeleteModalOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" fullWidth onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Transactions;
