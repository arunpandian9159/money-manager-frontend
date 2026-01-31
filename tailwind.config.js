/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#1d69ed",
        "background-light": "#f6f6f8",
        "background-dark": "#101722",
        "success": "#10B981",
        "danger": "#EF4444",
        "warning": "#F59E0B",
        // New auth theme colors
        "cream": "#F4F2ED",
        "navy": "#0F172A",
        "navy-light": "#1E293B",
        "terracotta": "#C25E45",
        "terracotta-light": "#D87A63",
        "sage": "#81B29A",
        "sage-light": "#E0EBE6",
        "border-light": "#E5E5E5",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "sans": ["General Sans", "Inter", "sans-serif"],
        "clash": ["Clash Display", "sans-serif"],
        "serif": ["Newsreader", "serif"],
        "mono": ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "full": "9999px"
      },
      boxShadow: {
        "editorial": "0 20px 40px -10px rgba(0, 0, 0, 0.05)",
        "card": "0 20px 40px -15px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
}

