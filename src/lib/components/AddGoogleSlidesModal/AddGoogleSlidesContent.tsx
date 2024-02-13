import { FormState, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';

import { Anchor } from '../../common/Anchor';
import { Input } from '../../common/Input';
import { ModalActions } from '../../common/Modal/ModalActions';
import { ModalBody } from '../../common/Modal/ModalBody';
import { ModalFooter } from '../../common/Modal/ModalFooter';
import { ModalHeader } from '../../common/Modal/ModalHeader';
import { pxToRem } from '../../styles/utils';

export type AddGoogleSlidesContent = {
  formState: FormState<{
    url: string;
  }>;
  register: UseFormRegister<{
    url: string;
  }>;
};

export const AddGoogleSlidesContent: React.FC<AddGoogleSlidesContent> = ({
  formState,
  register,
}) => {
  return (
    <>
      <ModalHeader>Add Google Slides presentation</ModalHeader>
      <ModalBodyStyled>
        <NoteStyled>
          Learn how to
          <AnchorStyled href="https://support.google.com/docs/answer/183965?hl=en&co=GENIE.Platform%3DDesktop">
            publish files from Google Drive
          </AnchorStyled>
        </NoteStyled>
        <Input
          {...register('url')}
          error={formState.errors.url?.message}
          placeholder="Paste the “Publish to the web” link"
          data-testid="add-slide-show-url-input"
        />
      </ModalBodyStyled>
      <ModalFooter>
        <ModalActions saveButtonType="submit" isDisabled={!formState.isValid} />
      </ModalFooter>
    </>
  );
};

const NoteStyled = styled.p`
  font-size: ${pxToRem(14)};
  color: ${props => props.theme.colors.grey};
  margin-bottom: ${pxToRem(16)};
`;

const AnchorStyled = styled(Anchor)`
  margin: 0 ${pxToRem(2)};
`;

const ModalBodyStyled = styled(ModalBody)`
  padding-top: 0;
`;
