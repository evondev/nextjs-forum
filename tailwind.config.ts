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
        "secondary-color-bg-2": "#F7F7F7",
        "secondary-color-secondary-2": "#3F4354",
        "blue-blue": "#347AE2",
      },
    },
  },
  plugins: [],
};
export default config;
