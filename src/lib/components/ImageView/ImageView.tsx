import { editorViewCtx } from '@milkdown/core';
import { useInstance } from '@milkdown/react';
import { useNodeViewContext } from '@prosemirror-adapter/react';
import { useRef } from 'react';
import styled from 'styled-components';

import { ImageEditorFormValues } from './hooks/useImageEditorForm';
import { ImageEditorModal } from './ImageEditorModal';
import { Image } from '../../common/Image';
import { useTextEditorModeContext } from '../TextEditorModeContext/useTextEditorModeContext';

export const ImageView: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const { mode } = useTextEditorModeContext();

  const { node, contentRef, setAttrs } = useNodeViewContext();
  const { attrs } = node;
  const [loading, getEditor] = useInstance();

  const onImageEdit = ({ alt, title }: ImageEditorFormValues) => {
    setAttrs({ alt, title });
  };

  const onImageRemove = () => {
    const editor = getEditor();
    if (loading || !editor) {
      return;
    }

    editor.action(ctx => {
      const view = ctx.get(editorViewCtx);
      const { state } = view;
      console.log(state.selection);

      view.dispatch(state.tr.deleteSelection());
    });
  };

  const alt = attrs.alt || '';
  const title = attrs.title || '';

  return (
    <ImageViewContainerStyled ref={contentRef}>
      {attrs.src && (
        <>
          <Image ref={imageRef} src={attrs.src} {...{ alt, title }}>
            {isLoading => (
              <>
                {mode === 'active' && !isLoading && (
                  <ImageEditorModal
                    {...{ onImageRemove, onImageEdit, alt, title }}
                  />
                )}
              </>
            )}
          </Image>
        </>
      )}
    </ImageViewContainerStyled>
  );
};

const ImageViewContainerStyled = styled.div`
  position: relative;
  display: inline-flex;
`;
