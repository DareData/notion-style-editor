import { editorViewCtx } from '@milkdown/core';
import { useInstance } from '@milkdown/react';
import { useNodeViewContext } from '@prosemirror-adapter/react';
import styled from 'styled-components';

import { ImageEditorFormValues } from './hooks/useEditImageForm';
import { ImageEditorModal } from './ImageEditorModal';

export const ImageView: React.FC = () => {
  const { node, contentRef, setAttrs } = useNodeViewContext();
  const { attrs } = node;
  const [, getEditor] = useInstance();

  const onImageEdit = ({ alt, title }: ImageEditorFormValues) => {
    setAttrs({ alt, title });
  };

  const onImageRemove = () => {
    const editor = getEditor();
    if (editor) {
      editor.action(ctx => {
        const view = ctx.get(editorViewCtx);
        const { state } = view;
        const { selection } = state;

        view.dispatch(state.tr.replace(selection.from, selection.to));
      });
    }
  };

  const alt = attrs.alt || '';
  const title = attrs.title || '';

  return (
    <ImageViewContainerStyled ref={contentRef}>
      {attrs.src && (
        <>
          <img src={attrs.src} {...{ alt, title }} />
          <ImageEditorModal {...{ onImageRemove, onImageEdit, alt, title }} />
        </>
      )}
    </ImageViewContainerStyled>
  );
};

const ImageViewContainerStyled = styled.div`
  position: relative;
  display: inline-flex;
  border: 1px solid red;
`;
