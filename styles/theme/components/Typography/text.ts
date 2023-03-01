import type { ComponentStyleConfig } from '@chakra-ui/theme';

import typography from '../../foundations/typography';

export const Text: ComponentStyleConfig = {
  baseStyle: {
    fontFamily: typography.fonts.body,
    fontWeight: typography.fontWeights.normal,
    lineHeight: typography.lineHeights.normal,
  },
  sizes: {
    xs: {
      fontSize: typography.fontSizes.xs,
    },
    sm: {
      fontSize: typography.fontSizes.sm,
    },
    md: {
      fontSize: typography.fontSizes.md,
    },
    lg: {
      fontSize: typography.fontSizes.lg,
    },
    xl: {
      fontSize: typography.fontSizes.xl,
    },
    '2xl': {
      fontSize: typography.fontSizes['2xl'],
    },
  },
  defaultProps: {
    size: 'md',
  },
};
