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

export const InsertGoogleDocContent: React.FC = () => {
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
      view.dispatch(getLinkCreationTransaction(view, { text: url, href: url }));
      onClose();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader>Add a Google document</ModalHeader>
      <ModalBody>
        <InputStyled
          {...register('url')}
          label="Link"
          error={formState.errors.url?.message}
          placeholder="Paste the link"
        />
        <NoteStyled>
          Your Google document needs to be published at Altos to generate a
          preview. You can
          <AnchorStyled href="https://support.google.com/docs/answer/183965?hl=en&co=GENIE.Platform%3DDesktop">
            check this article
          </AnchorStyled>
          to see how to do it.
        </NoteStyled>
      </ModalBody>
      <ModalFooter>
        <ModalActions saveButtonType="submit" isDisabled={!formState.isValid} />
      </ModalFooter>
    </form>
  );
};

const NoteStyled = styled.p`
  font-size: ${pxToRem(12)};
  color: ${props => props.theme.colors.grey};
`;

const AnchorStyled = styled(Anchor)`
  margin: 0 ${pxToRem(2)};
`;

const InputStyled = styled(Input)`
  margin-bottom: ${pxToRem(8)};
`;
