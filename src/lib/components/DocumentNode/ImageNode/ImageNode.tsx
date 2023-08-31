import { EditorStatus, editorViewCtx } from '@milkdown/core';
import { imageSchema } from '@milkdown/preset-commonmark';
import { useNodeViewContext } from '@prosemirror-adapter/react';
import { useState } from 'react';
import styled from 'styled-components';

import { ImageEditorFormValues } from './hooks/useImageEditorForm';
import { ImageEditorModal } from './ImageEditorModal';
import { Image } from '../../../common/Image';
import { Lightbox } from '../../../common/Lightbox';
import { useIsNodeSelected } from '../../../hooks/useIsNodeSelected';
import { useMilkdownInstance } from '../../../hooks/useMilkdownInstance';
import { useToggler } from '../../../hooks/useToggler';
import { pxToRem } from '../../../styles/utils';
import { useTextEditorContext } from '../../TextEditorContext/useTextEditoContext';

export const ImageNode: React.FC = () => {
  const [imageProperties, setImageProperties] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const { mode } = useTextEditorContext();
  const { isSelected } = useIsNodeSelected({ nodeType: imageSchema.type });

  const { node, contentRef, setAttrs } = useNodeViewContext();
  const { attrs } = node;
  const { editor, loading } = useMilkdownInstance();
  const lightboxState = useToggler();

  const onImageEdit = ({ alt, title }: ImageEditorFormValues) => {
    setAttrs({ alt, title });
  };

  const onImageRemove = () => {
    if (loading || !editor || editor.status !== EditorStatus.Created) {
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
          <ImageStyled
            src={attrs.src}
            onLoad={onImageLoad}
            onClick={lightboxState.on}
            data-testid="image-node"
            {...{ alt, title }}
          >
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
          </ImageStyled>
          <Lightbox
            src={attrs.src}
            onOpen={lightboxState.on}
            isOpen={lightboxState.state}
            onClose={lightboxState.off}
          />
        </>
      )}
    </ImageNodeContainerStyled>
  );
};

const ImageNodeContainerStyled = styled.div<{ $isSelected: boolean }>`
  position: relative;
  display: inline-flex;
  margin-bottom: ${pxToRem(16)};
  outline-offset: ${pxToRem(2)};
  outline: ${pxToRem(2)} solid
    ${props =>
      props.$isSelected ? props.theme.colors.lightBlack : 'transparent'};
  transition: outline-color 0.2s ease-in;
`;

const ImageStyled = styled(Image)`
  cursor: pointer;
  transition: opacity 0.1s ease-in;

  &:hover {
    opacity: 0.9;
  }
`;
