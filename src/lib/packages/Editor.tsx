import { EditorStatus, editorViewCtx, serializerCtx } from '@milkdown/core';
import { Milkdown as MilkdownEditor, useInstance } from '@milkdown/react';
import { forwardRef, useImperativeHandle } from 'react';

export type EditorRef = {
  reset: () => void;
  getValue: () => string | undefined;
};

type EditorProps = {};

export const Editor = forwardRef<EditorRef, EditorProps>((props, ref) => {
  const [loading, getEditor] = useInstance();

  useImperativeHandle(ref, () => ({
    reset: () => {
      const editor = getEditor();
      if (loading || !editor || editor.status !== EditorStatus.Created) {
        return;
      }
      editor.action(ctx => {
        const view = ctx.get(editorViewCtx);
        const { state } = view;

        view.dispatch(state.tr.replace(0, state.doc.content.size));
      });
    },
    getValue: () => {
      const editor = getEditor();
      if (loading || !editor || editor.status !== EditorStatus.Created) {
        return undefined;
      }
      return editor.action(ctx => {
        const view = ctx.get(editorViewCtx);
        const serializer = ctx.get(serializerCtx);
        const { state } = view;

        return serializer(state.tr.doc);
      });
    },
  }));

  return <MilkdownEditor />;
});
