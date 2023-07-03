import { editorViewCtx } from '@milkdown/core';
import { useInstance } from '@milkdown/react';
import styled from 'styled-components';

import {
  GoogleDocFormValues,
  useGoogleDocForm,
} from './hooks/useGoogleDocForm';
import { Anchor } from '../../common/Anchor';
import { Input } from '../../common/Input';
import { useModalContext } from '../../common/Modal/context/useModalContext';
import { ModalActions } from '../../common/Modal/ModalActions';
import { ModalBody } from '../../common/Modal/ModalBody';
import { ModalFooter } from '../../common/Modal/ModalFooter';
import { ModalHeader } from '../../common/Modal/ModalHeader';
import { useEditorLinkActions } from '../../hooks/useEditorLinkActions';
import { pxToRem } from '../../styles/utils';

export const GoogleSlidesContent: React.FC = () => {
  const [loading, getEditor] = useInstance();
  const { onClose } = useModalContext();
  const { handleSubmit, formState, register } = useGoogleDocForm();

  const { getLinkCreationTransaction } = useEditorLinkActions();

  const onSubmit = ({ url }: GoogleDocFormValues) => {
    const editor = getEditor();
    if (loading || !editor) {
      return;
    }

    editor.action(ctx => {
      const view = ctx.get(editorViewCtx);
      const transaction = getLinkCreationTransaction(view, {
        text: url,
        href: url,
      });
      if (transaction) {
        view.dispatch(transaction);
      }
      onClose();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        />
      </ModalBodyStyled>
      <ModalFooter>
        <ModalActions saveButtonType="submit" isDisabled={!formState.isValid} />
      </ModalFooter>
    </form>
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
