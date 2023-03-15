import { editorViewCtx } from '@milkdown/core';
import { useInstance } from '@milkdown/react';
import { useNodeViewContext } from '@prosemirror-adapter/react';
import styled from 'styled-components';

import { EditAttributesContent } from './EditAttributesContent';
import { EditImageFormValues } from './hooks/useEditImageForm';
import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';
import { Modal } from '../../common/Modal/Modal';
import { pxToRem } from '../../styles/utils';

export const ImageView: React.FC = () => {
  const { node, contentRef, setAttrs } = useNodeViewContext();
  const { attrs } = node;
  const [, getEditor] = useInstance();

  const onAttributesEdit = ({ alt, title }: EditImageFormValues) => {
    setAttrs({ alt, title });
  };

  const onRemoveImage = () => {
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

  return (
    <ImageViewContainerStyled ref={contentRef}>
      {attrs.src && (
        <>
          <img src={attrs.src} alt={attrs.alt} title={attrs.title} />
          <ImageEditorContainerStyled>
            <Modal
              handler={({ onOpen }) => (
                <ButtonStyled oval onClick={onOpen}>
                  Edit
                </ButtonStyled>
              )}
            >
              <EditAttributesContent
                alt={attrs.alt}
                title={attrs.title}
                {...{ onAttributesEdit }}
              />
            </Modal>
            <ButtonStyled oval onClick={onRemoveImage}>
              <Icon icon="delete" />
            </ButtonStyled>
          </ImageEditorContainerStyled>
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

const ImageEditorContainerStyled = styled.div`
  position: absolute;
  top: ${pxToRem(8)};
  right: ${pxToRem(8)};
  display: flex;
  align-items: center;
  gap: ${pxToRem(8)};
  z-index: 2;
`;

const ButtonStyled = styled(Button)`
  background-color: ${props => props.theme.colors.secondaryLightGrey};
  color: ${props => props.theme.colors.lightBlack};
  padding: ${pxToRem(8)} ${pxToRem(12)};
  font-size: ${pxToRem(14)};
  border-color: ${props => props.theme.colors.lightGrey};
`;
