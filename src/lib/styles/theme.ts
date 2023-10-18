const colors = {
  grey: '#6E7270',
  secondaryGrey: '#EAECEB',
  lightGrey: '#D6D6D6',
  secondaryLightGrey: '#F6F6F6',

  lightBlack: '#1F1F1F',

  white: '#FFFFFF',

  azure: '#E9F7F5',
  lightAzure: '#F8FBFB',

  lightGreen: '#68D391',
  green: '#45BAAC',

  transparentBlack: 'rgba(0,0,0,0.17)',

  darkRed: '#EB0000',
};

export const theme = {
  fonts: {
    primary: 'OpenSans',
    secondary: 'SourceCodePro',
    figree: 'Figtree',
  },
  sizes: {
    baseSize: 16,
  },
  components: {
    modal: {
      footer: {
        cancel: colors.lightGrey,
        save: colors.lightGreen,
      },
      backdrop: {
        background: colors.transparentBlack,
      },
    },
    editor: {
      link: '#0836AA',
      mermaid: {
        lineColor: '#45BAAC',
        primaryColor: '#E9F7F5',
        primaryTextColor: '#1F1F1F',
        primaryBorderColor: '#45BAAC',
        secondaryColor: '#45BAAC',
        tertiaryColor: '#F6F6F6',
      },
    },
    selection: '#e9f7f5',
  },
  zIndexes: {
    menu: 99,
    aboveMenu: 100,
    modal: {
      backdrop: 2000,
      container: 2001,
    },
    dropdown: {
      container: 99999,
    },
  },
  colors,
  queries: {
    tablet: '426px',
    laptop: '700px',
    menuWithSpace: '724px',
  },
};

export type Theme = typeof theme;
