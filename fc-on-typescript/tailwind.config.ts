import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: ["text-primary", "text-info", "text-error", "text-success", "text-warning", "text-normal", "text-fw", "text-mf", "text-df", "text-gk"], // dynamic class not removed list
  theme: {
    extend: {
      colors: {
        primary: "#00b495",
        info: "#76a9fa",
        error: "#e27778",
        success: "#31c48d",
        warning: "#faca15",
        normal: "#d1d5db",
        fw: "#f6425f",
        mf: "#00d28b",
        df: "#2b7def",
        gk: "#f2be57",
        bp: "#2e82ef",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
