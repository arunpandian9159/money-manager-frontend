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
    <aside className="w-[280px] h-full bg-background-light dark:bg-secondary border-r border-secondary/5 dark:border-white/5 flex flex-col shrink-0 transition-all duration-300 z-20">
      {/* Logo */}
      <div className="p-8 pb-12">
        <NavLink to="/app/dashboard" className="flex items-center gap-3 group">
          <div className="size-8 text-primary group-hover:scale-110 transition-transform duration-300">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                height="32"
                stroke="currentColor"
                strokeWidth="4"
                width="32"
                x="8"
                y="8"
              ></rect>
              <path d="M8 40L40 8" stroke="currentColor" strokeWidth="2"></path>
              <circle cx="24" cy="24" fill="currentColor" r="6"></circle>
            </svg>
          </div>
          <h2 className="text-secondary dark:text-background-light font-display text-sm font-bold tracking-tight uppercase leading-none">
            Money <br /> Manager
          </h2>
        </NavLink>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-6 flex flex-col gap-1">
        <p className="font-mono text-[10px] uppercase tracking-widest text-secondary/40 dark:text-background-light/30 mb-4 px-2">
          Navigation
        </p>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-none transition-all duration-300 group relative ${
                isActive
                  ? "text-primary bg-primary/5"
                  : "text-secondary/60 dark:text-background-light/60 hover:text-secondary dark:hover:text-background-light"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-primary" />
                )}
                <span
                  className={`material-symbols-outlined text-[20px] ${!isActive && "group-hover:translate-x-1"} transition-transform`}
                  style={
                    isActive && item.filled
                      ? { fontVariationSettings: "'FILL' 1" }
                      : {}
                  }
                >
                  {item.icon}
                </span>
                <p
                  className={`text-sm tracking-wide ${isActive ? "font-bold" : "font-medium"}`}
                >
                  {item.label}
                </p>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-6">
        <button
          onClick={handleLogout}
          className="flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-none h-12 px-4 bg-transparent border border-secondary/10 dark:border-white/10 text-secondary/60 dark:text-background-light/60 hover:border-danger hover:text-danger dark:hover:border-danger dark:hover:text-danger transition-all text-xs font-mono uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span className="truncate">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
