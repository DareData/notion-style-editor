import { MotionProps, Variants } from 'framer-motion';

export const fadeInOut: MotionProps = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const toggleInOut: MotionProps = {
  initial: {
    opacity: 0,
    height: 0,
  },
  animate: {
    height: 'auto',
    opacity: 1,
  },
  exit: {
    opacity: 0,
    height: 0,
  },
};

export const toggleOutInVariant: Variants = {
  show: {
    height: 'auto',
    opacity: 1,
  },
  hidden: {
    height: '0',
    opacity: 0,
  },
};
