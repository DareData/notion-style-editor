import { TooltipProvider } from '@milkdown/plugin-tooltip';
import { linkSchema } from '@milkdown/preset-commonmark';
import { TextSelection } from '@milkdown/prose/state';
import { useInstance } from '@milkdown/react';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import { useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';

import { useHyperlinkAttrs } from './hooks/useHyperlinkAttrs';
import { Anchor } from '../../common/Anchor';
import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';
import { useSelectedMarkPosition } from '../../hooks/useSelectedMarkPosition';
import { pxToRem } from '../../styles/utils';
import { LinkModal } from '../LinkModal/LinkModal';
import { useTextEditorModeContext } from '../TextEditorModeContext/useTextEditorModeContext';

export const LinkTooltip: React.FC = () => {
  const { colors } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const tooltipProvider = useRef<TooltipProvider>();
  const [text, setText] = useState('');

  const [loading] = useInstance();
  const { view, prevState } = usePluginViewContext();
  const { mode } = useTextEditorModeContext();
  const { getSelectedMarkPosition } = useSelectedMarkPosition();

  const { title, href } = useHyperlinkAttrs();

  useEffect(() => {
    if (ref.current && !tooltipProvider.current && !loading) {
      const provider = new TooltipProvider({
        content: ref.current,
        tippyOptions: {
          zIndex: 30,
          arrow: true,
          placement: 'bottom',
        },
        shouldShow: view => {
          const { selection } = view.state;

          const linkPosition = getSelectedMarkPosition(view, linkSchema.type());

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
  }, [loading, getSelectedMarkPosition, mode]);

  useEffect(() => {
    tooltipProvider.current?.update(view, prevState);
  });

  if (mode === 'preview') {
    return null;
  }

  return (
    <div style={{ display: 'none' }}>
      <LinkTooltipStyled ref={ref}>
        <LinkTextStyled>{href}</LinkTextStyled>
        <LinkModal
          editable
          {...{ title, text, href }}
          handler={({ onOpen }) => (
            <ButtonStyled oval onClick={onOpen} space="small">
              <Icon icon="edit" fill={colors.white} />
            </ButtonStyled>
          )}
        />
        <AnchorStyled {...{ href }} target="_blank" type="anchor-button">
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
  white-space: nowrap;
  text-decoration: underline;
  text-overflow: ellipsis;
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