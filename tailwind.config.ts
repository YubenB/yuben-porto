/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "pulse-delayed": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 1s infinite",
      },
    },
  },
  plugins: [typography],
};
