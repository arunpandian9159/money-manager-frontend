import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const Header = ({ onSearch }) => {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    if (onSearch) {
      onSearch(e.target.value)
    }
  }

  return (
    <header className="h-16 bg-white dark:bg-[#1a2332] border-b border-[#f0f2f4] dark:border-gray-800 flex items-center justify-between px-8 shrink-0">
      {/* Search Bar */}
      <div className="w-[400px]">
        <div className="relative flex w-full items-center h-10 rounded-lg focus-within:ring-2 ring-primary/20 transition-all">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#617089]">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="block w-full pl-10 pr-3 py-2 border-none rounded-lg bg-[#f0f2f4] dark:bg-white/5 text-[#111318] dark:text-white placeholder-[#617089] text-sm focus:ring-0"
            placeholder="Search transactions..."
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button className="relative p-2 text-[#617089] hover:text-primary transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/5">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full ring-2 ring-white dark:ring-[#1a2332] bg-red-500"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-[#f0f2f4] dark:border-gray-700">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-[#111318] dark:text-white">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-[#617089]">Pro Plan</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border-2 border-white dark:border-gray-700 shadow-sm">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

