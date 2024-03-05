import { EditorStatus } from '@milkdown/core';
import { TooltipProvider } from '@milkdown/plugin-tooltip';
import { linkSchema } from '@milkdown/preset-commonmark';
import { TextSelection } from '@milkdown/prose/state';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import { useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';

import { useHyperlinkAttrs } from './hooks/useHyperlinkAttrs';
import { Anchor } from '../../common/Anchor';
import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';
import { useMilkdownInstance } from '../../hooks/useMilkdownInstance';
import { useSelectedMarkPosition } from '../../hooks/useSelectedMarkPosition';
import { pxToRem } from '../../styles/utils';
import { LinkModal } from '../LinkModal/LinkModal';
import { useTextEditorContext } from '../TextEditorContext/useTextEditorContext';

export const LinkTooltip: React.FC = () => {
  const { colors } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const tooltipProvider = useRef<TooltipProvider>();
  const [text, setText] = useState('');

  const { editor, loading } = useMilkdownInstance();
  const { view, prevState } = usePluginViewContext();
  const { mode } = useTextEditorContext();
  const { getSelectedMarkPosition } = useSelectedMarkPosition();

  const { href } = useHyperlinkAttrs();

  useEffect(() => {
    if (
      ref.current &&
      !tooltipProvider.current &&
      !loading &&
      editor &&
      editor.status !== EditorStatus.Destroyed &&
      editor.status !== EditorStatus.OnDestroy
    ) {
      const provider = new TooltipProvider({
        content: ref.current,
        tippyOptions: {
          zIndex: 30,
          arrow: true,
          placement: 'bottom',
        },
        shouldShow: view => {
          if (loading || !editor || editor.status !== EditorStatus.Created) {
            return false;
          }
          const { ctx } = editor;
          const { selection } = view.state;

          const linkPosition =
            ctx && getSelectedMarkPosition(view, linkSchema.type(ctx));

          if (selection instanceof TextSelection && linkPosition) {
            setText(linkPosition.text);
            return true;
          }

          return false;
        },
      });

      tooltipProvider.current = provider;
    }

    return () => {
      tooltipProvider.current?.destroy();
    };
  }, [editor, getSelectedMarkPosition, mode, loading]);

  useEffect(() => {
    tooltipProvider.current?.update(view, prevState);
  });

  if (mode === 'preview') {
    return null;
  }

  return (
    <div style={{ display: 'none' }}>
      <LinkTooltipStyled ref={ref} data-testid="link-tooltip-container">
        <LinkTextStyled>{href}</LinkTextStyled>
        <LinkModal
          editable
          {...{ text, href }}
          handler={({ onOpen }) => (
            <ButtonStyled
              oval
              onClick={onOpen}
              space="small"
              data-testid="link-tooltip-edit-button"
            >
              <Icon icon="edit" fill={colors.white} />
            </ButtonStyled>
          )}
        />
        <AnchorStyled
          {...{ href }}
          target="_blank"
          variant="button"
          space="small"
          oval
        >
          <Icon icon="export" />
        </AnchorStyled>
      </LinkTooltipStyled>
    </div>
  );
};

const LinkTooltipStyled = styled.div`
  display: flex;
  align-items: center;
  padding: ${pxToRem(6)} ${pxToRem(8)} ${pxToRem(6)} ${pxToRem(14)};
  background-color: ${props => props.theme.colors.lightBlack};
  border-radius: ${pxToRem(8)};
`;

const LinkTextStyled = styled.span`
  overflow: hidden;
  color: ${props => props.theme.colors.white};
  font-size: ${pxToRem(14)};
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: underline;
`;

const ButtonStyled = styled(Button)`
  margin-left: ${pxToRem(6)};
  margin-right: ${pxToRem(2)};

  &:hover,
  &:focus {
    background-color: transparent;
    border-color: ${props => props.theme.colors.green};
  }
`;

const AnchorStyled = styled(Anchor)`
  &:hover,
  &:focus {
    background-color: transparent;
  }
`;
