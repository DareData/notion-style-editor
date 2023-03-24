import { editorViewCtx } from '@milkdown/core';
import { linkSchema } from '@milkdown/preset-commonmark';
import { useInstance } from '@milkdown/react';
import styled from 'styled-components';

import {
  HyperlinkFormValues,
  useHyperlinkForm,
} from './hooks/useHyperlinkForm';
import { useLinkActions } from './hooks/useLinkActions';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { useModalContext } from '../../common/Modal/context/useModalContext';
import { ModalActions } from '../../common/Modal/ModalActions';
import { ModalBody } from '../../common/Modal/ModalBody';
import { ModalFooter } from '../../common/Modal/ModalFooter';
import { ModalHeader } from '../../common/Modal/ModalHeader';
import { useSelectedMarkPosition } from '../../hooks/useSelectedMarkPosition';

export type HyperlinkModalContentProps = {
  text?: string;
  href?: string;
  title?: string;
  editable: boolean;
  onSubmit?: () => void;
};

export const HyperlinkModalContent: React.FC<HyperlinkModalContentProps> = ({
  text = '',
  href = '',
  title = '',
  editable,
  onSubmit,
}) => {
  const { onClose } = useModalContext();
  const [, getEditor] = useInstance();

  const { formState, register, handleSubmit } = useHyperlinkForm({
    text,
    href,
    title,
  });
  const { getSelectedMarkPosition } = useSelectedMarkPosition();
  const { getLinkCreationTransaction, getLinkUpdateTransaction } =
    useLinkActions();

  const onHandleSubmit = (data: HyperlinkFormValues) => {
    onSubmit?.();
    const editor = getEditor();
    if (editor) {
      editor.action(ctx => {
        const view = ctx.get(editorViewCtx);
        if (editable) {
          const updateTransaction = getLinkUpdateTransaction(view, data);
          if (updateTransaction) {
            view.dispatch(updateTransaction);
          }
        } else {
          view.dispatch(getLinkCreationTransaction(view, data));
        }
        onClose();
      });
    }
  };

  const onLinkRemove = () => {
    const editor = getEditor();
    if (editor) {
      editor.action(ctx => {
        const view = ctx.get(editorViewCtx);
        const linkPosition = getSelectedMarkPosition(view, linkSchema.type());

        if (linkPosition) {
          view.dispatch(
            view.state.tr.deleteRange(linkPosition.start, linkPosition.end)
          );
        }

        onClose();
      });
    }
  };

  const header = editable ? 'Edit a link' : 'Add a link';

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>
        <Input
          {...register('text')}
          label="Text"
          error={formState.errors.text?.message}
          required
          placeholder="Add a text"
        />
        <Input
          label="Link"
          placeholder="Paste a link"
          required
          {...register('href')}
          error={formState.errors.href?.message}
        />
        {editable && (
          <TitleInputStyled
            label="Title"
            placeholder="Optional"
            {...register('title')}
          />
        )}
      </ModalBody>
      <ModalFooterStyled>
        {editable && (
          <Button oval onClick={onLinkRemove} color="danger" variant="outlined">
            Remove link
          </Button>
        )}
        <ModalActionsStyled
          isDisabled={!formState.isValid}
          saveButtonType="submit"
        />
      </ModalFooterStyled>
    </form>
  );
};

const TitleInputStyled = styled(Input)`
  margin-bottom: 0;
`;

const ModalFooterStyled = styled(ModalFooter)`
  display: flex;
  align-items: center;
`;

const ModalActionsStyled = styled(ModalActions)`
  margin-left: auto;
`;
