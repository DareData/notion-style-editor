import { DefaultToastOptions } from 'react-hot-toast';

import { theme } from '../theme';
import { pxToRem } from '../utils';

export const toasterStyles: DefaultToastOptions = {
  error: {
    className: 'error-toaster',
    icon: '🫠',
    style: {
      padding: `${pxToRem(13)} ${pxToRem(16)}`,
      color: theme.colors.lightBlack,
      background: '#FFDDDD',
      maxWidth: 'none',
      gap: `${pxToRem(5)}`,
    },
  },
  success: {
    className: 'success-toaster',
    icon: '🙌',
    style: {
      padding: `${pxToRem(13)} ${pxToRem(16)}`,
      color: theme.colors.white,
      background: theme.colors.lightBlack,
      maxWidth: 'none',
      gap: `${pxToRem(5)}`,
    },
  },
};
