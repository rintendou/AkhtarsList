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
        secondary: "#000133",
        tertiary: "#1E3A8A",
      },
    },
  },
  plugins: [],
}
