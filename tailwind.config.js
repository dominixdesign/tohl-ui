const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "#1C3362",
          50: "#ABC6E7",
          100: "#93B4E0",
          200: "#6391D2",
          300: "#376CC1",
          400: "#2A4F92",
          500: "#1C3362",
          600: "#16274E",
          700: "#111C3A",
          800: "#0B1227",
          900: "#050813",
        },
        secondary: {
          DEFAULT: "#B91E1F",
          50: "#F6C7C7",
          100: "#F2B1B1",
          200: "#EB8585",
          300: "#E4595A",
          400: "#DD2D2E",
          500: "#B91E1F",
          600: "#8D1718",
          700: "#611010",
          800: "#350909",
          900: "#090202",
        },
      },
    },
  },
  plugins: ["@tailwindcss/forms"],
};
