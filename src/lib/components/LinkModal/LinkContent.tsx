import { EditorStatus, editorViewCtx } from '@milkdown/core';
import { linkSchema } from '@milkdown/preset-commonmark';
import styled from 'styled-components';

import { LinkFormValues, useLinkForm } from './hooks/useLinkForm';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { useModalContext } from '../../common/Modal/context/useModalContext';
import { ModalActions } from '../../common/Modal/ModalActions';
import { ModalBody } from '../../common/Modal/ModalBody';
import { ModalFooter } from '../../common/Modal/ModalFooter';
import { ModalHeader } from '../../common/Modal/ModalHeader';
import { useEditorLinkActions } from '../../hooks/useEditorLinkActions';
import { useMilkdownInstance } from '../../hooks/useMilkdownInstance';
import { useSelectedMarkPosition } from '../../hooks/useSelectedMarkPosition';

export type LinkContentProps = {
  text?: string;
  href?: string;
  editable: boolean;
  onSubmit?: () => void;
};

export const LinkContent: React.FC<LinkContentProps> = ({
  text = '',
  href = '',
  editable,
  onSubmit,
}) => {
  const { onClose } = useModalContext();
  const { editor, loading } = useMilkdownInstance();

  const { formState, register, handleSubmit } = useLinkForm({
    text,
    href,
  });
  const { getSelectedMarkPosition } = useSelectedMarkPosition();
  const { getLinkCreationTransaction, getLinkUpdateTransaction } =
    useEditorLinkActions();

  const onHandleSubmit = (data: LinkFormValues) => {
    onSubmit?.();
    if (editor && !loading && editor.status === EditorStatus.Created) {
      editor.action(ctx => {
        const view = ctx.get(editorViewCtx);
        if (editable) {
          const updateTransaction = getLinkUpdateTransaction(view, data);
          if (updateTransaction) {
            view.dispatch(updateTransaction);
          }
        } else {
          const transaction = getLinkCreationTransaction(view, data);
          if (transaction) {
            view.dispatch(transaction);
          }
        }
        onClose();
      });
    }
  };

  const onLinkRemove = () => {
    if (editor && !loading && editor.status === EditorStatus.Created) {
      editor.action(ctx => {
        const view = ctx.get(editorViewCtx);
        const linkPosition = getSelectedMarkPosition(
          view,
          linkSchema.type(ctx)
        );

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
          placeholder="Optional"
          data-testid="link-text-input"
        />
        <Input
          label="Link"
          placeholder="Paste a link"
          required
          {...register('href')}
          error={formState.errors.href?.message}
          data-testid="link-href-input"
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

const ModalFooterStyled = styled(ModalFooter)`
  display: flex;
  align-items: center;
`;

const ModalActionsStyled = styled(ModalActions)`
  margin-left: auto;
`;
