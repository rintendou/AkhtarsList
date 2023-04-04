/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#1f2937",
        tertiary: "#FF6347",
      },
      fontFamily: { sans: "'Inter', sans" },
    },
  },
  plugins: [],
}
