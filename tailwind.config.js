const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    ({ addUtilities, e, theme, variants }) => {
      let colors = flattenColorPalette(theme('borderColor'))
      delete colors['default']

      // Replace or Add custom colors
      if (this.theme?.extend?.colors !== undefined) {
        colors = Object.assign(colors, this.theme.extend.colors)
      }

      const colorMap = Object.keys(colors).map((color) => ({
        [`.border-t-${color}`]: { borderTopColor: colors[color] },
        [`.border-r-${color}`]: { borderRightColor: colors[color] },
        [`.border-b-${color}`]: { borderBottomColor: colors[color] },
        [`.border-l-${color}`]: { borderLeftColor: colors[color] }
      }))
      const utilities = Object.assign({}, ...colorMap)

      addUtilities(utilities, variants('borderColor'))
    }
  ],
  theme: {
    fontFamily: {
      mono: ['"Ubuntu Mono"', 'ui-sans-serif', 'system-ui'],
      sans: ['"Yantramanav"', 'sans-serif', 'system-ui']
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
      fontSize: {
        xxs: '.6rem',
        playername: '2vw',
        '10xl': '9rem'
      },
      lineHeight: {
        '6xl': '5rem',
        '10xl': '10rem'
      },
      boxShadow: {
        schedule: '0 0 16px 0 rgb(0 14 20 / 30%)',
        pageDark: '0px 0px 80px -25px #ffffff',
        pageLight: '0px 0px 80px -25px #000C16',
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
      minWidth: {
        20: '5rem'
      },
      zIndex: {
        '-1': '-1',
        1: 1,
        9: 9
      },
      maxWidth: {
        xxs: '120px'
      },
      width: {
        '10plus': 'calc(100% + 10px)'
      },
      height: {
        '10plus': 'calc(100% + 10px)'
      },
      colors: {
        colors: {
          green: colors.emerald,
          yellow: colors.amber,
          purple: colors.violet,
          gray: colors.neutral
        },
        current: 'currentColor',
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
