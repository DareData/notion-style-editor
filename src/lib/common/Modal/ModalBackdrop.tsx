import { motion, MotionProps } from 'framer-motion';

type ModalBackdropProps = {
  animation: MotionProps;
};

export const ModalBackdrop: React.FC<ModalBackdropProps> = ({ animation }) => (
  <motion.div {...animation} className="modal-backdrop" />
);
