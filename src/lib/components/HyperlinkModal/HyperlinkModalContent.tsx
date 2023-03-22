import { editorViewCtx } from '@milkdown/core';
import { linkSchema } from '@milkdown/preset-commonmark';
import { findChildrenByMark } from '@milkdown/prose';
import { useInstance } from '@milkdown/react';
import { removeSelectedNode } from 'prosemirror-utils';
import styled from 'styled-components';

import {
  HyperlinkFormValues,
  useHyperlinkForm,
} from './hooks/useHyperlinkForm';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { useModalContext } from '../../common/Modal/context/useModalContext';
import { ModalActions } from '../../common/Modal/ModalActions';
import { ModalBody } from '../../common/Modal/ModalBody';
import { ModalFooter } from '../../common/Modal/ModalFooter';
import { ModalHeader } from '../../common/Modal/ModalHeader';

export type HyperlinkModalContentProps = {
  text?: string;
  href?: string;
  title?: string;
  onSave: (href: HyperlinkFormValues) => void;
  editable: boolean;
};

export const HyperlinkModalContent: React.FC<HyperlinkModalContentProps> = ({
  text = '',
  href = '',
  title = '',
  editable,
  onSave,
}) => {
  const { onClose } = useModalContext();
  const [, getEditor] = useInstance();

  const { formState, register, handleSubmit } = useHyperlinkForm({
    text,
    href,
    title,
  });

  const onHandleSubmit = (data: HyperlinkFormValues) => {
    onSave(data);
    onClose();
  };

  const onLinkRemove = () => {
    const editor = getEditor();
    if (editor) {
      editor.action(ctx => {
        const view = ctx.get(editorViewCtx);
        const { state } = view;
        const { selection } = state;

        const linkPosition = findChildrenByMark(state.doc, linkSchema.type())
          .map(link => ({
            start: link.pos,
            end: link.pos + link.node.nodeSize,
          }))
          .find(
            ({ start, end }) => selection.from >= start && selection.to <= end
          );

        if (linkPosition) {
          view.dispatch(
            state.tr.deleteRange(linkPosition.start, linkPosition.end)
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
        <Input placeholder="Optional" label="Text" {...register('text')} />
        <Input
          label="Link"
          placeholder="Paste a link"
          required
          {...register('href')}
          error={formState.errors.href?.message}
        />
        <TitleInputStyled
          label="Title"
          placeholder="Optional"
          {...register('title')}
        />
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
