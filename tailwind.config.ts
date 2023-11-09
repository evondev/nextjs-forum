import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "secondary-color-bg-2": "#F7F7F7",
        "secondary-color-2": "#3F4354",
        "secondary-color-3": "#97989D",
        "secondary-color-4": "#858EAD",
        "secondary-color-5": "#C5D0E6",
        "secondary-color-6": "#F4F6F8",
        secondary: "#347AE2",
        dark2: "#1E252B",
        dark3: "#262D34",
        dark4: "#2C353D",
        primary: "#FF6934",
      },
    },
  },
  plugins: [],
};
export default config;
