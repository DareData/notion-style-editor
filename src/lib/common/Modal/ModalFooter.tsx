import styled from 'styled-components';

import { pxToRem } from '../../styles/utils';

export const ModalFooter = styled.div`
  padding: ${pxToRem(24)} ${pxToRem(24)} ${pxToRem(16)};
  font-size: ${pxToRem(16)};
  line-height: ${pxToRem(18)};
`;
