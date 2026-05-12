import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#3390ec",
          soft: "#50a8ff",
          dark: "#1a73d9"
        }
      },
      boxShadow: {
        glass: "0 8px 40px rgba(25, 129, 255, 0.15)"
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "0.3", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(-4px)" }
        }
      },
      animation: {
        pulseDot: "pulseDot 1.2s ease-in-out infinite"
      }
    }
  },
  plugins: [],
};

export default config;
