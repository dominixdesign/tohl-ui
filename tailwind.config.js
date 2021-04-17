module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{js,jsx,ts,tsx,vue}',
    './layouts/**/*.{js,jsx,ts,tsx,vue}',
    './pages/**/*.{js,jsx,ts,tsx,vue}',
  ],
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        header: "url('/background.jpg')",
      }),
      colors: {
        primary: {
          DEFAULT: '#0061AF',
          50: '#96D0FF',
          100: '#7CC5FF',
          200: '#49AEFF',
          300: '#1697FF',
          400: '#007DE2',
          500: '#0061AF',
          600: '#00457C',
          700: '#002849',
          800: '#000C16',
          900: '#000000',
        },
        secondary: {
          DEFAULT: '#B92727',
          50: '#F5D0D0',
          100: '#F1BBBB',
          200: '#E89191',
          300: '#DF6767',
          400: '#D63D3D',
          500: '#B92727',
          600: '#8F1E1E',
          700: '#651515',
          800: '#3B0C0C',
          900: '#110303',
        },
      },
    },
  },
}
