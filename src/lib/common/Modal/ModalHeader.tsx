import styled from 'styled-components';

import { pxToRem } from '../../styles/utils';

export const ModalHeader = styled.div`
  padding: ${pxToRem(24)} ${pxToRem(24)} ${pxToRem(6)};
  color: ${props => props.theme.colors.lightBlack};
  font-size: ${pxToRem(21)};
  line-height: ${pxToRem(27)};
  font-weight: 500;
`;
