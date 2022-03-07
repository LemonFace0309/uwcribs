module.exports = {
  theme: {
    extend: {
      colors: {
        sea: {
          50: '#F8FBFC',
          100: '#F1F8F9',
          200: '#E3F1F3',
          300: '#D1E8EB',
          400: '#C2E0E5',
          500: '#AED6DC',
          600: '#8DC5CE',
          700: '#62AFBB',
          800: '#4594A0',
          900: '#316972',
        },
        salmon: {
          50: '#FFF6F5',
          100: '#FFEDEB',
          200: '#FFDFDB',
          300: '#FFCDC7',
          400: '#FFB2A8',
          500: '#FF9A8D',
          600: '#FF7C6B',
          700: '#FF543D',
          800: '#F01C00',
          900: '#A81400',
        },
        navy: {
          50: '#F3F4F7',
          100: '#E7E9EE',
          200: '#CCD0DC',
          300: '#ABB2C5',
          400: '#838EA9',
          500: '#4A536B',
          600: '#434B60',
          700: '#383F51',
          800: '#2C313F',
          900: '#232833',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    // due to https://github.com/tailwindlabs/tailwindcss/issues/6602 - buttons disappear
    // importing new preflight css file causes styles to stutter on hard refresh. The disabled
    // preflight doesn't stutter.
    preflight: false,
  },
};
