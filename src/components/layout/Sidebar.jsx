import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  {
    path: "/app/dashboard",
    label: "Dashboard",
    icon: "dashboard",
    filled: true,
  },
  { path: "/app/transactions", label: "Transactions", icon: "receipt_long" },
  { path: "/app/reports", label: "Reports", icon: "pie_chart" },
  { path: "/app/accounts", label: "Accounts", icon: "credit_card" },
  { path: "/app/settings", label: "Settings", icon: "settings" },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <aside className="w-[280px] h-full bg-white dark:bg-[#1a2332] border-r border-[#f0f2f4] dark:border-gray-800 flex flex-col shrink-0 transition-all duration-300 z-20">
      {/* Logo */}
      <div className="p-6 pb-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-[#111318] dark:text-white text-xl font-bold leading-normal tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">
              account_balance_wallet
            </span>
            Money Manager
          </h1>
          <p className="text-[#617089] dark:text-gray-400 text-xs font-medium leading-normal pl-10">
            Financial App
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                isActive
                  ? "bg-primary/10 text-primary border-l-4 border-primary"
                  : "text-[#617089] hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#111318] dark:text-gray-400 dark:hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`material-symbols-outlined ${!isActive && "group-hover:scale-110"} transition-transform`}
                  style={
                    isActive && item.filled
                      ? { fontVariationSettings: "'FILL' 1" }
                      : {}
                  }
                >
                  {item.icon}
                </span>
                <p
                  className={`text-sm leading-normal ${isActive ? "font-semibold" : "font-medium"}`}
                >
                  {item.label}
                </p>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-[#f0f2f4] dark:border-gray-800">
        <button
          onClick={handleLogout}
          className="flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-white/10 text-[#617089] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors text-sm font-bold leading-normal"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="truncate">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
