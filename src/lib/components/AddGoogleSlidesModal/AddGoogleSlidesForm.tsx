import { EditorStatus, editorViewCtx } from '@milkdown/core';

import { AddGoogleSlidesModalContent as DefaultAddGoogleSlidesContent } from './AddGoogleSlidesModalContent';
import {
  GoogleDocFormValues,
  useGoogleDocForm,
} from './hooks/useGoogleDocForm';
import { useModalContext } from '../../common/Modal/context/useModalContext';
import { useEditorLinkActions } from '../../hooks/useEditorLinkActions';
import { useMilkdownInstance } from '../../hooks/useMilkdownInstance';
import { useTextEditorContext } from '../TextEditorContext/useTextEditorContext';

export const AddGoogleSlidesForm: React.FC = () => {
  const { editor, loading } = useMilkdownInstance();
  const { onClose } = useModalContext();
  const { handleSubmit, formState, register } = useGoogleDocForm();

  const { components } = useTextEditorContext();
  const AddGoogleSlidesModalContent =
    components?.AddGoogleSlidesModalContent || DefaultAddGoogleSlidesContent;

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <AddGoogleSlidesModalContent formState={formState} register={register} />
    </form>
  );
};
