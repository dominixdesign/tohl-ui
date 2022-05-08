// tailwind.config.js
const colors = require("tailwindcss/colors");

module.exports = {
  // ...
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        teal: colors.teal,
        cyan: colors.cyan,
        rose: colors.rose,
        primary: {
          DEFAULT: "#006EC7",
          50: "#80C6FF",
          100: "#6BBDFF",
          200: "#42ABFF",
          300: "#1A98FF",
          400: "#0085F0",
          500: "#006EC7",
          600: "#00579E",
          700: "#004175",
          800: "#002A4D",
          900: "#001424",
        },
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
