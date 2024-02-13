import { EditorStatus, editorViewCtx } from '@milkdown/core';

import { DefaultAddGoogleSlidesModal } from './DefaultAddGoogleSlidesModal';
import {
  GoogleDocFormValues,
  useGoogleDocForm,
} from './hooks/useGoogleDocForm';
import { useModalContext } from '../../common/Modal/context/useModalContext';
import { ModalProps } from '../../common/Modal/Modal';
import { useEditorLinkActions } from '../../hooks/useEditorLinkActions';
import { useMilkdownInstance } from '../../hooks/useMilkdownInstance';
import { useTextEditorContext } from '../TextEditorContext/useTextEditorContext';

type AddGoogleSlidesModalProps = ModalProps;

export const AddGoogleSlidesModal: React.FC<AddGoogleSlidesModalProps> = ({
  handler,
  onModalOpen,
  onModalClose,
}) => {
  const { editor, loading } = useMilkdownInstance();
  const { onClose } = useModalContext();
  const { handleSubmit, formState, register } = useGoogleDocForm();

  const { components } = useTextEditorContext();
  const AddGoogleSlides =
    components?.AddGoogleSlidesModal || DefaultAddGoogleSlidesModal;

  const { getLinkCreationTransaction } = useEditorLinkActions();

  const onSubmit = ({ url }: GoogleDocFormValues) => {
    if (loading || !editor || editor.status !== EditorStatus.Created) {
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
    <AddGoogleSlides
      {...{
        handler,
        onModalOpen,
        onModalClose,
        onSubmit: handleSubmit(onSubmit),
        register,
        formState,
      }}
    />
  );
};
