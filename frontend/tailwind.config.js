/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy:    { DEFAULT: "#0f172a", light: "#1e293b", lighter: "#334155" },
        charcoal:"#1a1f2e",
        accent:  { blue: "#3b82f6", purple: "#8b5cf6", cyan: "#06b6d4" },
      },
      fontFamily: { sans: ["Inter", "sans-serif"] },
      boxShadow: {
        glow:        "0 0 20px rgba(59,130,246,0.3)",
        "glow-purple":"0 0 20px rgba(139,92,246,0.3)",
        glass:       "0 8px 32px rgba(0,0,0,0.3)",
      },
      backgroundImage: {
        "hero-gradient":   "linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)",
        "card-gradient":   "linear-gradient(135deg,rgba(30,41,59,0.8),rgba(15,23,42,0.9))",
        "accent-gradient": "linear-gradient(135deg,#3b82f6,#8b5cf6)",
      },
      animation: {
        "float":     "float 6s ease-in-out infinite",
        "pulse-slow":"pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
