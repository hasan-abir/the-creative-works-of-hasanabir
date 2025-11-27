import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  lightMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          50: "#FFFFFF",
          100: "#EBECD5",
          200: "#FFE180",
        },
        dark: {
          50: "#1B1B1B",
          100: "#1E1D1D",
          200: "#3E3D3D",
          300: "#272626",
        },
        primary: {
          50: "#EB9859",
          100: "#FF9A4D",
        },
        primaryrgb: {
          50: "rgba(235, 152, 89, 0.5)",
        },
      },
      textShadow: {
        sm: "0 1px 2px rgba(240, 241, 220, 0.5)",
        DEFAULT: "0 2px 4px rgba(240, 241, 220, 0.5)",
        lg: "0 8px 16px rgba(240, 241, 220, 0.5)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        shortphones: { raw: "(max-height: 680px)" },
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
export default config;
