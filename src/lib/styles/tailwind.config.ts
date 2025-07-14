import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
};
export default config;
