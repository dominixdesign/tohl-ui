const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('./tailwind.colors.json')

module.exports = {
  content: ['./pages/**/*.{vue,js}', './components/**/*.{vue,js}', './layouts/**/*.{vue,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['overpass', ...defaultTheme.fontFamily.sans],
        mono: ['overpass-mono', ...defaultTheme.fontFamily.sans]
      },
      colors
    }
  },
  plugins: ['@tailwindcss/forms']
}
