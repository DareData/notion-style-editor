import borders from './borders';
import breakpoints from './breakpoints';
import colors from './colors';
import radii from './border-radius';
import shadows from './shadows';
import sizes from './sizes';
import spacing from './spacing';
import transition from './transition';
import typography from './typography';
import zIndices from './z-index';
import blur from './blur';

export const foundations = {
  breakpoints,
  zIndices,
  radii,
  blur,
  colors,
  sizes,
  shadows,
  borders,
  transition,
  ...typography,
  space: spacing,
};
