import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: [
    "text-primary",
    "text-info",
    "text-error",
    "text-success",
    "text-warning",
    "text-normal",
    "text-fw",
    "text-mf",
    "text-df",
    "text-gk",
    "text-over0",
    "text-over10",
    "text-over20",
    "text-over30",
    "text-over40",
    "text-over50",
    "text-over60",
    "text-over70",
    "text-over80",
    "text-over90",
    "text-over100",
    "text-over110",
    "text-over120",
    "text-over130",
    "text-over140",
    "text-over150",
    "text-over160",
  ], // dynamic class not removed list
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
        over0: "#8f96a0",
        over10: "#8f96a0",
        over20: "#8f96a0",
        over30: "#8f96a0",
        over40: "#8f96a0",
        over50: "#8f96a0",
        over60: "#606972",
        over70: "#1f2d37",
        over80: "#2194d6",
        over90: "#175dde",
        over100: "#6e3bff",
        over110: "#b33bff",
        over120: "#cf13c0",
        over130: "#dc0000",
        over140: "#c99b00",
        over150: "#c99b00",
        over160: "#c99b00",
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
