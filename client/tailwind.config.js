/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },

    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#121212",
        tertiary: "#FF6347",
      },
      fontFamily: { sans: "'Inter', sans" },
      animation: {
        pulse: "pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
}
