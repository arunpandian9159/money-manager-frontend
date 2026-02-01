import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Header = ({ onSearch }) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <header className="h-20 bg-background-light dark:bg-secondary border-b border-secondary/5 dark:border-white/5 flex items-center justify-between px-12 shrink-0">
      {/* Search Bar */}
      <div className="w-[480px]">
        <div className="relative flex w-full items-center h-12 transition-all">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-secondary/40 dark:text-background-light/40">
            <span className="material-symbols-outlined text-[18px]">
              search
            </span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="block w-full pl-11 pr-4 py-3 border border-secondary/10 dark:border-white/10 rounded-none bg-transparent text-secondary dark:text-background-light placeholder-secondary/40 dark:placeholder-background-light/40 text-xs font-mono uppercase tracking-widest focus:border-primary transition-all ring-0 focus:ring-0"
            placeholder="Explore Capital Flow..."
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-8">
        {/* Notification Bell */}
        <button className="relative p-2 text-secondary/60 dark:text-background-light/60 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[22px]">
            notifications
          </span>
          <span className="absolute top-2 right-2.5 block h-1.5 w-1.5 rounded-none bg-primary"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-4 pl-8 border-l border-secondary/5 dark:border-white/5">
          <div className="text-right hidden md:block">
            <p className="text-sm font-serif italic text-secondary dark:text-background-light">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-[10px] font-mono uppercase tracking-wider text-secondary/40 dark:text-background-light/40">
              Institutional Tier
            </p>
          </div>
          <div className="h-10 w-10 rounded-none bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20 shadow-soft">
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
