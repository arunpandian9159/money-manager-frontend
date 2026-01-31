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
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    description: "",
    category: "others",
    division: "personal",
    date: format(new Date(), "yyyy-MM-dd"),
    account: "",
  });
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTransactions();
    fetchAccounts();
  }, [filters, pagination.page]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
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

  const openAddModal = () => {
    setSelectedTransaction(null);
    setFormData({
      type: "expense",
      amount: "",
      description: "",
      category: "others",
      division: "personal",
      date: format(new Date(), "yyyy-MM-dd"),
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
      const data = { ...formData, amount: parseFloat(formData.amount) };
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#111318] dark:text-white">
            Transactions
          </h1>
          <p className="text-[#617089] mt-1">Manage your income and expenses</p>
        </div>
        <Button icon="add" onClick={openAddModal}>
          Add Transaction
        </Button>
      </div>

      {/* Filters */}
      <Card padding={false}>
        <div className="flex flex-wrap gap-4 p-4">
          <Select
            options={[
              { value: "", label: "All Types" },
              { value: "income", label: "Income" },
              { value: "expense", label: "Expense" },
            ]}
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            placeholder="Type"
            className="w-40"
          />
          <Select
            options={[
              { value: "", label: "All Divisions" },
              { value: "office", label: "Office" },
              { value: "personal", label: "Personal" },
            ]}
            value={filters.division}
            onChange={(e) =>
              setFilters({ ...filters, division: e.target.value })
            }
            placeholder="Division"
            className="w-40"
          />
          <Select
            options={[{ value: "", label: "All Categories" }, ...CATEGORIES]}
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            placeholder="Category"
            className="w-40"
          />
        </div>
      </Card>

      {/* Transactions Table */}
      <Card padding={false}>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-white/5">
                <tr>
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
                  <th className="text-center py-3 px-4 text-sm font-medium text-[#617089]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
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
                      <td className="py-3 px-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => openEditModal(tx)}
                            disabled={!canEdit(tx)}
                            className={`p-1.5 rounded-lg ${canEdit(tx) ? "hover:bg-gray-100 dark:hover:bg-white/10 text-[#617089]" : "opacity-30 cursor-not-allowed"}`}
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              edit
                            </span>
                          </button>
                          <button
                            onClick={() => openDeleteModal(tx)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-[#617089]">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {pagination.total > pagination.limit && (
          <div className="flex justify-center gap-2 p-4 border-t border-[#f0f2f4] dark:border-gray-800">
            <Button
              variant="secondary"
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
            >
              Previous
            </Button>
            <span className="px-4 py-2 text-sm text-[#617089]">
              Page {pagination.page}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={pagination.page * pagination.limit >= pagination.total}
              onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
            >
              Next
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
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
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
