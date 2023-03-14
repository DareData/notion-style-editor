import { motion, MotionProps } from 'framer-motion';
import styled from 'styled-components';

type ModalBackdropProps = {
  animation: MotionProps;
};

export const ModalBackdrop: React.FC<ModalBackdropProps> = ({ animation }) => (
  <ModalBackdropStyled {...animation} />
);

const ModalBackdropStyled = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${props => props.theme.zIndexes.modal.backdrop};
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${props => props.theme.components.modal.backdrop.background};
`;
