import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          50: "#F2F0E2",
          100: "#ECE9D9",
          200: "#E9E5D1",
        },
        dark: {
          50: "#1F281E",
          100: "#1B231B",
          200: "#182018",
        },
        yolk: {
          50: "#FFD747",
          100: "#D4D0BA"
        },
        brown: {
          50: "#3D3021",
          100: "#694B27"
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
