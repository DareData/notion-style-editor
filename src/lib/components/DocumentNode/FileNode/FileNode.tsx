import { EditorStatus, editorViewCtx } from '@milkdown/core';
import { useNodeViewContext } from '@prosemirror-adapter/react';
import styled, { css, useTheme } from 'styled-components';

import { FileNodeContent } from './FileNodeContent';
import { useFileName } from './hooks/useFileName';
import { Button } from '../../../common/Button';
import { Icon } from '../../../common/Icon/Icon';
import { useMilkdownInstance } from '../../../hooks/useMilkdownInstance';
import { pxToRem } from '../../../styles/utils';
import { Matcher } from '../../../utils/Matcher';
import { useTextEditorContext } from '../../TextEditorContext/useTextEditoContext';

export const FileNode: React.FC = () => {
  const { colors } = useTheme();
  const { node } = useNodeViewContext();
  const { editor, loading } = useMilkdownInstance();

  const { mode } = useTextEditorContext();

  const { attrs } = node;

  const { src } = attrs;

  const { name } = useFileName({ src: src });

  const onFileRemove = () => {
    if (loading || !editor || editor.status !== EditorStatus.Created) {
      return;
    }

    editor.action(ctx => {
      const view = ctx.get(editorViewCtx);
      const { state } = view;

      view.dispatch(state.tr.deleteSelection());
    });
  };

  return (
    <>
      {Matcher(mode)
        .match('active', () => (
          <ActiveContainerStyled>
            <FileNodeContent {...{ name }}>
              <RemoveButtonStyled
                oval
                color="secondary"
                variant="text"
                space="small"
                onClick={onFileRemove}
              >
                <Icon icon="delete" fill={colors.lightBlack} />
              </RemoveButtonStyled>
            </FileNodeContent>
          </ActiveContainerStyled>
        ))
        .match('preview', () => (
          <PreviewContainerStyled href={src} download={name} target="_blank">
            <FileNodeContent {...{ name }}>
              <Button oval color="secondary" variant="text" space="small">
                <Icon icon="download" />
              </Button>
            </FileNodeContent>
          </PreviewContainerStyled>
        ))
        .get()}
    </>
  );
};

const RemoveButtonStyled = styled(Button)`
  pointer-events: none;
  opacity: 0;
  transition: 0.1s ease-in;

  &:hover {
    background-color: #eeefee;
  }
`;

const containerStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${pxToRem(16)};
  padding: ${pxToRem(12)} ${pxToRem(16)};
  gap: ${pxToRem(16)};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${pxToRem(6)};
  transition: 0.1s ease-in;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.secondaryLightGrey};
    ${RemoveButtonStyled} {
      opacity: 1;
      pointer-events: all;
    }
  }
`;

const ActiveContainerStyled = styled.div`
  ${containerStyles}
`;

const PreviewContainerStyled = styled.a`
  ${containerStyles}
`;
