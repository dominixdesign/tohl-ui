module.exports = {
  mode: 'jit',
  darkMode: 'class',
  purge: [
    './components/**/*.{js,jsx,ts,tsx,vue}',
    './layouts/**/*.{js,jsx,ts,tsx,vue}',
    './pages/**/*.{js,jsx,ts,tsx,vue}'
  ],
  plugins: [require('@tailwindcss/forms')],
  theme: {
    fontFamily: {
      headline: ['Exo', 'ui-sans-serif', 'system-ui']
    },
    extend: {
      backgroundImage: (theme) => ({
        dizzle:
          "linear-gradient(to right, rgba(0, 12, 22, 1.0) 65%, rgba(0, 12, 22, 0.8)), url('/dazzle.svg')",
        'dizzle-light':
          "linear-gradient(to right, rgba(249, 250, 251, 1.0) 50%, rgba(249, 250, 251, 0.95) 65%, rgba(249, 250, 251, 0.9)), url('/dazzle-light.svg')"
      }),
      scale: {
        200: '2',
        250: '2.5'
      },
      boxShadow: {
        b: '0 10px 15px -3px rgba(0, 0, 0, 1), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
      },
      borderWidth: {
        10: '10px',
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px'
      },
      zIndex: {
        9: 9
      },
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
          900: '#000000'
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
          900: '#110303'
        }
      }
    }
  }
}
