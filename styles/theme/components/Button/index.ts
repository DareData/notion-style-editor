import { defineStyle } from '@chakra-ui/react';
import type { ComponentStyleConfig } from '@chakra-ui/theme';

const sm = defineStyle({
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: 0,
  padding: '0px, 12px, 0px, 4px',
  borderRadius: '8px',
});

const md = defineStyle({
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '16.8px',
  padding: '8px, 16px, 8px, 8px',
  borderRadius: '8px',
});

const lg = defineStyle({
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '19.2px',
  padding: '4px, 16px, 4px, 8px',
  borderRadius: '12px',
});

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontFamily: 'Figtree',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '16.8px',
    padding: '8px, 16px, 8px, 8px',
    borderRadius: '9px',
  },
  sizes: { sm, md, lg },
};
