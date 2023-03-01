const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  black: '#1F1F1F',
  white: '#FFFFFF',

  blackAlpha: {
    50: 'rgba(31, 31, 31, 0.04)',
    100: 'rgba(31, 31, 31, 0.06)',
    200: 'rgba(31, 31, 31, 0.08)',
    300: 'rgba(31, 31, 31, 0.16)',
    400: 'rgba(31, 31, 31, 0.24)',
    500: 'rgba(31, 31, 31, 0.36)',
    600: 'rgba(31, 31, 31, 0.48)',
    700: 'rgba(31, 31, 31, 0.64)',
    800: 'rgba(31, 31, 31, 0.80)',
    900: 'rgba(31, 31, 31, 0.92)',
  },

  alpha: {
    light: 'rgba(246, 246, 246, 0.7)',
    mid: 'rgba(234, 236, 235, 0.7)',
    dark: 'rgba(31, 31, 31, 0.80)',
  },

  neutral: {
    light: '#F6F6F6',
    mid: '#EAECEB',
    dark: '#6E7270',
  },

  primary: {
    light: '#C0F8D5',
    mid: '#68D391',
    dark: '#6E7270',

    // TODO: remove
    bg: {
      idle: '#00B97C',
      hover: '#13CC8F',
      active: '#008A5D',
      delete: '#FF3C3C',
      disabled: '#EDEDED',
    },
    color: {
      idle: '#FFFFFF',
      hover: '#FFFFFF',
      active: '#FFFFFF',
      delete: '#FFFFFF',
      disabled: '#737272',
    },
  },

  brand: {
    hover: 'rgba(237, 237, 237, .5)',
    action: 'rgba(237, 237, 237, 1)',
  },

  secondary: {
    teal: {
      light: '#FBFEFC',
      mid: '#D2EFEA',
    },
    purple: {
      light: '#ECD0F9',
      mid: '#AD24D6',
    },
    yellow: {
      light: '#FFF0B9',
      mid: '#FFC21A',
    },
    blue: {
      light: '#CFF3FF',
      mid: '#73C7E5',
    },
  },

  utilities: {
    outline: '#D6D6D6',
    link: '#0836AA',
    destructive: {
      100: '#FFDDDD',
      500: '#EB0000',
    },
  },
};

export default colors;
