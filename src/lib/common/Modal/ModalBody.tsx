import styled from 'styled-components';

import { pxToRem } from '../../styles/utils';

export const ModalBody = styled.div`
  flex: 1;
  padding: ${pxToRem(12)} ${pxToRem(24)} ${pxToRem(12)};
  color: ${props => props.theme.colors.lightBlack};
  font-size: ${pxToRem(16)};
  line-height: ${pxToRem(21)};
`;
