import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Button,
  Card,
  Modal,
  Input,
  Select,
  StatCard,
} from "../components/common";
import { accountsAPI, transactionsAPI } from "../api";

const ACCOUNT_TYPES = [
  { value: "checking", label: "Checking" },
  { value: "savings", label: "Savings" },
  { value: "credit", label: "Credit Card" },
];

const ACCOUNT_ICONS = {
  checking: "account_balance",
  savings: "savings",
  credit: "credit_card",
};

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [summary, setSummary] = useState({ totalBalance: 0, accountCount: 0 });
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "checking",
    balance: "",
    description: "",
  });
  const [transferData, setTransferData] = useState({
    fromAccount: "",
    toAccount: "",
    amount: "",
  });
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [accountTransactions, setAccountTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const [accountsRes, summaryRes] = await Promise.all([
        accountsAPI.getAll(),
        accountsAPI.getSummary(),
      ]);
      setAccounts(accountsRes.data.accounts || []);
      setSummary(summaryRes.data || { totalBalance: 0, accountCount: 0 });
    } catch (err) {
      console.error("Failed to fetch accounts:", err);
    } finally {
      setLoading(false);
    }
  };

  const openHistoryModal = async (account) => {
    setSelectedAccount(account);
    setHistoryModalOpen(true);
    setLoadingTransactions(true);
    try {
      const res = await transactionsAPI.getAll({
        accountId: account._id,
        limit: 20,
        sortBy: "date",
        sortOrder: "desc",
      });
      setAccountTransactions(res.data.transactions || []);
    } catch (err) {
      console.error("Failed to fetch account transactions:", err);
    } finally {
      setLoadingTransactions(false);
    }
  };

  const openAddModal = () => {
    setSelectedAccount(null);
    setFormData({ name: "", type: "checking", balance: "", description: "" });
    setFormError("");
    setModalOpen(true);
  };

  const openEditModal = (account) => {
    setSelectedAccount(account);
    setFormData({
      name: account.name,
      type: account.type,
      balance: account.balance.toString(),
      description: account.description || "",
    });
    setFormError("");
    setModalOpen(true);
  };

  const openDeleteModal = (account) => {
    setSelectedAccount(account);
    setDeleteModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.balance) {
      setFormError("Please fill all required fields");
      return;
    }
    setSaving(true);
    try {
      const data = { ...formData, balance: parseFloat(formData.balance) };
      if (selectedAccount) await accountsAPI.update(selectedAccount._id, data);
      else await accountsAPI.create(data);
      setModalOpen(false);
      fetchAccounts();
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to save account");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await accountsAPI.delete(selectedAccount._id);
      setDeleteModalOpen(false);
      fetchAccounts();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete account");
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (
      !transferData.fromAccount ||
      !transferData.toAccount ||
      !transferData.amount
    ) {
      setFormError("Please fill all fields");
      return;
    }
    if (transferData.fromAccount === transferData.toAccount) {
      setFormError("Cannot transfer to the same account");
      return;
    }
    setSaving(true);
    try {
      await accountsAPI.transfer({
        fromAccountId: transferData.fromAccount,
        toAccountId: transferData.toAccount,
        amount: parseFloat(transferData.amount),
      });
      setTransferModalOpen(false);
      setTransferData({ fromAccount: "", toAccount: "", amount: "" });
      fetchAccounts();
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to transfer");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#111318] dark:text-white">
            Accounts
          </h1>
          <p className="text-[#617089] mt-1">
            Manage your bank accounts and credit cards
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            icon="sync_alt"
            onClick={() => {
              setFormError("");
              setTransferModalOpen(true);
            }}
          >
            Transfer
          </Button>
          <Button icon="add" onClick={openAddModal}>
            Add Account
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Balance"
          value={`₹${summary.totalBalance?.toLocaleString() || 0}`}
          icon="account_balance_wallet"
          iconColor="blue"
        />
        <StatCard
          title="Total Accounts"
          value={summary.accountCount || accounts.length}
          icon="credit_card"
          iconColor="green"
        />
        <StatCard
          title="Average Balance"
          value={`₹${accounts.length > 0 ? Math.round(summary.totalBalance / accounts.length).toLocaleString() : 0}`}
          icon="calculate"
          iconColor="orange"
        />
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <Card key={account._id} className="relative">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-lg ${account.type === "credit" ? "bg-red-50 text-red-600" : account.type === "savings" ? "bg-green-50 text-green-600" : "bg-blue-50 text-primary"}`}
                >
                  <span className="material-symbols-outlined">
                    {ACCOUNT_ICONS[account.type]}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEditModal(account)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-[#617089]"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      edit
                    </span>
                  </button>
                  <button
                    onClick={() => openDeleteModal(account)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      delete
                    </span>
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#111318] dark:text-white mb-1">
                {account.name}
              </h3>
              <p className="text-sm text-[#617089] capitalize mb-4">
                {account.type} Account
              </p>
              <p
                className={`text-2xl font-bold ${account.balance >= 0 ? "text-[#111318] dark:text-white" : "text-red-600"}`}
              >
                ₹{account.balance?.toLocaleString()}
              </p>
              {account.description && (
                <p className="text-sm text-[#617089] mt-2">
                  {account.description}
                </p>
              )}
              <button
                onClick={() => openHistoryModal(account)}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-sm text-[#617089] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  history
                </span>
                View Transactions
              </button>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-[#617089]">
            No accounts yet. Add your first account!
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedAccount ? "Edit Account" : "Add Account"}
      >
        {formError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {formError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Account Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Main Checking"
            required
          />
          <Select
            label="Account Type"
            options={ACCOUNT_TYPES}
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          />
          <Input
            label="Initial Balance"
            type="number"
            value={formData.balance}
            onChange={(e) =>
              setFormData({ ...formData, balance: e.target.value })
            }
            placeholder="0.00"
            required
          />
          <Input
            label="Description (Optional)"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Account description"
          />
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
              {selectedAccount ? "Update" : "Add"} Account
            </Button>
          </div>
        </form>
      </Modal>

      {/* Transfer Modal */}
      <Modal
        isOpen={transferModalOpen}
        onClose={() => setTransferModalOpen(false)}
        title="Transfer Between Accounts"
      >
        {formError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {formError}
          </div>
        )}
        <form onSubmit={handleTransfer} className="flex flex-col gap-4">
          <Select
            label="From Account"
            options={accounts.map((a) => ({
              value: a._id,
              label: `${a.name} (₹${a.balance?.toLocaleString()})`,
            }))}
            value={transferData.fromAccount}
            onChange={(e) =>
              setTransferData({ ...transferData, fromAccount: e.target.value })
            }
          />
          <Select
            label="To Account"
            options={accounts.map((a) => ({
              value: a._id,
              label: `${a.name} (₹${a.balance?.toLocaleString()})`,
            }))}
            value={transferData.toAccount}
            onChange={(e) =>
              setTransferData({ ...transferData, toAccount: e.target.value })
            }
          />
          <Input
            label="Amount"
            type="number"
            value={transferData.amount}
            onChange={(e) =>
              setTransferData({ ...transferData, amount: e.target.value })
            }
            placeholder="0.00"
            required
          />
          <div className="flex gap-3 mt-4">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={() => setTransferModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" fullWidth loading={saving}>
              Transfer
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Account"
        size="sm"
      >
        <p className="text-[#617089] mb-6">
          Are you sure you want to delete "{selectedAccount?.name}"? This action
          cannot be undone.
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

      {/* Account Transaction History Modal */}
      <Modal
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        title={`Transactions - ${selectedAccount?.name || ""}`}
        size="lg"
      >
        {loadingTransactions ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : accountTransactions.length > 0 ? (
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-white/5 sticky top-0">
                <tr>
                  <th className="text-left py-2 px-3 text-sm font-medium text-[#617089]">
                    Description
                  </th>
                  <th className="text-left py-2 px-3 text-sm font-medium text-[#617089]">
                    Date
                  </th>
                  <th className="text-right py-2 px-3 text-sm font-medium text-[#617089]">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {accountTransactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="border-b border-[#f0f2f4] dark:border-gray-800"
                  >
                    <td className="py-2 px-3">
                      <span className="font-medium text-[#111318] dark:text-white text-sm">
                        {tx.description}
                      </span>
                      <span
                        className={`ml-2 px-1.5 py-0.5 rounded text-xs ${tx.division === "office" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}
                      >
                        {tx.division}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-sm text-[#617089]">
                      <div>{format(new Date(tx.date), "MMM dd, yyyy")}</div>
                      <div className="text-xs">
                        {format(new Date(tx.date), "hh:mm a")}
                      </div>
                    </td>
                    <td
                      className={`py-2 px-3 text-right font-bold text-sm ${tx.type === "income" ? "text-green-600" : "text-red-600"}`}
                    >
                      {tx.type === "income" ? "+" : "-"}₹
                      {tx.amount?.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center py-8 text-[#617089]">
            No transactions found for this account.
          </p>
        )}
        <div className="mt-4">
          <Button
            variant="secondary"
            fullWidth
            onClick={() => setHistoryModalOpen(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Accounts;
