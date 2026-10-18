import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        cream: "#FFFDF7",
        paper: "#F8F6F0",
        doodle: {
          blue: "#2563EB",
          sky: "#00B4D8",
          pink: "#FF6584",
          yellow: "#FFD12E",
          orange: "#FF6B35",
          green: "#70E000",
          lime: "#A3E635",
          purple: "#8B5CF6",
          violet: "#7B2CBF",
          red: "#EF4444",
          dark: "#0F172A",
          card: "#FFFFFF",
          border: "#0F172A",
        },
        gold: "#EAB308",
        saffron: "#F97316",
        muted: "#64748B",
        line: "#E2E8F0"
      },
      boxShadow: {
        doodle: "4px 4px 0px #0F172A",
        "doodle-sm": "2px 2px 0px #0F172A",
        "doodle-lg": "6px 6px 0px #0F172A",
        "doodle-xl": "8px 8px 0px #0F172A",
        "doodle-yellow": "4px 4px 0px #EAB308",
        "doodle-pink": "4px 4px 0px #FF6584",
        "doodle-blue": "4px 4px 0px #2563EB",
        glow: "0 0 35px rgba(234,179,8,0.2)"
      },
      borderWidth: {
        "3": "3px",
      },
      fontFamily: {
        doodle: ["Outfit", "Fredoka", "system-ui", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
