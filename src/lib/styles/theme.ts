const colors = {
  grey: '#6E7270',
  secondaryGrey: '#EAECEB',
  lightGrey: '#D6D6D6',
  secondaryLightGrey: '#F6F6F6',

  lightBlack: '#1F1F1F',

  white: '#FFFFFF',

  azure: '#E9F7F5',
  lightAzure: '#F8FBFB',

  green: '#45BAAC',
  transparentBlack: 'rgba(0,0,0,0.17)',

  darkRed: '#DD4B39',
};

export const theme = {
  fonts: {
    primary: 'OpenSans',
    secondary: 'SourceCodePro',
  },
  sizes: {
    baseSize: 16,
  },
  components: {
    modal: {
      footer: {
        cancel: colors.lightGrey,
        save: '#68D391',
      },
      backdrop: {
        background: colors.transparentBlack,
      },
    },
  },
  zIndexes: {
    modal: {
      backdrop: 100,
      container: 101,
    },
  },
  colors,
  queries: {
    tablet: '480px',
    laptop: '768px',
    desktop: '960px',
    large: '1200px',
  },
};

export type Theme = typeof theme;
