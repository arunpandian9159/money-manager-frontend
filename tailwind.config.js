/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D65A31", // Terracotta
          light: "#E47F5C",
          dark: "#B84825",
          contrast: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#0A192F", // Navy
          light: "#1E293B",
          dark: "#050B16",
        },
        accent: {
          DEFAULT: "#81B29A", // Sage
          light: "#E0EBE6",
          dark: "#5A8C73",
        },
        background: {
          light: "#F9F8F4", // Editorial Cream/White
          dark: "#050B16",
          alt: "#ECEBE6",
        },
        success: "#10B981",
        danger: "#EF4444",
        warning: "#F59E0B",
        "border-light": "#E5E5E5",
      },
      fontFamily: {
        display: ["General Sans", "Inter", "sans-serif"],
        sans: ["General Sans", "Inter", "sans-serif"],
        serif: ["Newsreader", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0", // Boxy refined look
        md: "0.25rem",
        lg: "0.5rem",
        xl: "1rem",
        "2xl": "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        editorial: "0 20px 40px -10px rgba(10, 25, 47, 0.05)",
        card: "0 10px 30px -5px rgba(10, 25, 47, 0.03)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        soft: "0 2px 10px rgba(0, 0, 0, 0.02)",
      },
    },
  },
  plugins: [],
};
