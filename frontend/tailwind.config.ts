import type { Config } from "tailwindcss";

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
          100: "#CECECE",
          200: "#87875A",
        },
        dark: {
          50: "#1B1B1B",
          100: "#1E1D1D",
          200: "#3E3D3D",
          300: "#404426",
        },
        primary: {
          50: "#EB9859"
        }
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
  plugins: [],
};
export default config;
