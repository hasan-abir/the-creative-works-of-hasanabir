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
          50: "#F7FFEC",
          100: "#E5E9DF",
          200: "#E9E5D1",
        },
        dark: {
          50: "#41443D",
          100: "#3A3D36",
          200: "#182018",
        },
        brown: {
          50: "#D2A071",
          100: "#402A10"
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
