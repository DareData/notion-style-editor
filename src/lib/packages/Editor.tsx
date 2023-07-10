import { editorViewCtx } from '@milkdown/core';
import { Milkdown as MilkdownEditor, useInstance } from '@milkdown/react';
import { forwardRef, useImperativeHandle } from 'react';

export type EditorRef = {
  reset: () => void;
  getValue: () => string | undefined;
};

type EditorProps = {};

export const Editor = forwardRef<EditorRef, EditorProps>((props, ref) => {
  const [loading, getEditor] = useInstance();
  const editor = getEditor();

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (loading || !editor) {
        return;
      }
      editor.action(ctx => {
        const view = ctx.get(editorViewCtx);
        const { state } = view;

        view.dispatch(state.tr.replace(0, state.doc.content.size));
      });
    },
    getValue: () => {
      if (loading || !editor) {
        return undefined;
      }
      editor.action(ctx => {
        const view = ctx.get(editorViewCtx);
        const { state } = view;

        return state.doc.text;
      });
    },
  }));

  return <MilkdownEditor />;
});
