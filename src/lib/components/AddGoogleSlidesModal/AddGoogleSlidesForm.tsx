import { EditorStatus, editorViewCtx } from '@milkdown/core';

import { AddGoogleSlidesContent as DefaultAddGoogleSlidesContent } from './AddGoogleSlidesContent';
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
  const AddGoogleSlidesContent =
    components?.AddGoogleSlideModal || DefaultAddGoogleSlidesContent;

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
      <AddGoogleSlidesContent formState={formState} register={register} />
    </form>
  );
};
