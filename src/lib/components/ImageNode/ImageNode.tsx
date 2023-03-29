import { editorViewCtx } from '@milkdown/core';
import { imageSchema } from '@milkdown/preset-commonmark';
import { useInstance } from '@milkdown/react';
import { useNodeViewContext } from '@prosemirror-adapter/react';
import { useState } from 'react';
import styled from 'styled-components';

import { ImageEditorFormValues } from './hooks/useImageEditorForm';
import { ImageEditorModal } from './ImageEditorModal';
import { Image } from '../../common/Image';
import { useFindSelectedNode } from '../../hooks/useFindSelectedNode';
import { pxToRem } from '../../styles/utils';
import { useTextEditorModeContext } from '../TextEditorModeContext/useTextEditorModeContext';

export const ImageNode: React.FC = () => {
  const [imageProperties, setImageProperties] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const { mode } = useTextEditorModeContext();
  const { isSelected } = useFindSelectedNode({ nodeType: imageSchema.type() });

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

      view.dispatch(state.tr.deleteSelection());
    });
  };

  const onImageLoad = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalHeight, naturalWidth } = currentTarget;
    setImageProperties({ width: naturalWidth, height: naturalHeight });
  };

  const alt = attrs.alt || '';
  const title = attrs.title || '';

  return (
    <ImageNodeContainerStyled ref={contentRef} $isSelected={isSelected}>
      {attrs.src && (
        <>
          <Image src={attrs.src} onLoad={onImageLoad} {...{ alt, title }}>
            {isLoading => (
              <>
                {mode === 'active' && !isLoading && (
                  <ImageEditorModal
                    imageHeight={imageProperties.height}
                    imageWidth={imageProperties.width}
                    {...{ onImageRemove, onImageEdit, alt, title }}
                  />
                )}
              </>
            )}
          </Image>
        </>
      )}
    </ImageNodeContainerStyled>
  );
};

const ImageNodeContainerStyled = styled.div<{ $isSelected: boolean }>`
  position: relative;
  display: inline-flex;
  outline-offset: ${pxToRem(2)};
  outline: ${pxToRem(2)} solid
    ${props =>
      props.$isSelected ? props.theme.colors.lightBlack : 'transparent'};
  transition: outline-color 0.2s ease-in;
`;
