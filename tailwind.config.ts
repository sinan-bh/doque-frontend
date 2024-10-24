import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkBg:"#242424",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        fadeIn: "fadeIn 1s ease-out",
        marquee: "marquee 3s linear infinite",
        bounceDelay: "bounceDelay 1.5s infinite",

      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "90%": { transform: "translateX(-100%)" }, 
          "100%": { transform: "translateX(-100%)" },
        },
        bounceDelay: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-25px)" },
        },
      },
      
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
};

export default config;
