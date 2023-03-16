import { commandsCtx } from '@milkdown/core';
import { tooltipFactory, TooltipProvider } from '@milkdown/plugin-tooltip';
import { updateLinkCommand } from '@milkdown/preset-commonmark';
import { TextSelection } from '@milkdown/prose/state';
import { useInstance } from '@milkdown/react';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import { useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components';

import { useHyperlinkAttrs } from './hooks/useHyperlinkAttrs';
import { Anchor } from '../../common/Anchor';
import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';
import { pxToRem } from '../../styles/utils';
import { HyperlinkFormValues } from '../HyperlinkModal/hooks/useHyperlinkForm';
import { HyperlinkModal } from '../HyperlinkModal/HyperlinkModal';

export const hyperlinktooltip = tooltipFactory('HYPERLINK');

export const HyperlinkTooltip: React.FC = () => {
  const { colors } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const tooltipProvider = useRef<TooltipProvider>();

  const [loading, getEditor] = useInstance();
  const { view, prevState } = usePluginViewContext();

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

          const node = view.state.doc.nodeAt(selection.from);

          if (
            selection instanceof TextSelection &&
            node?.marks.find(mark => mark.type.name === 'link')
          )
            return true;

          return false;
        },
      });

      tooltipProvider.current = provider;
    }

    return () => {
      tooltipProvider.current?.destroy();
    };
  }, [loading]);

  useEffect(() => {
    tooltipProvider.current?.update(view, prevState);
  });

  const onHyperlinkSave = (data: HyperlinkFormValues) => {
    if (loading) {
      return;
    }

    getEditor()?.action(ctx => {
      const commands = ctx.get(commandsCtx);
      commands.call(updateLinkCommand.key, data);
    });
  };

  return (
    <HyperlinkTooltipStyled ref={ref}>
      <HyperlinkTextStyled>{href}</HyperlinkTextStyled>
      <HyperlinkModal
        {...{ title, href }}
        handler={({ onOpen }) => (
          <ButtonStyled oval onClick={onOpen} space="small">
            <Icon icon="edit" fill={colors.white} />
          </ButtonStyled>
        )}
        onSave={onHyperlinkSave}
      />
      <AnchorStyled {...{ href }} target="_blank" type="anchor-button">
        <Icon icon="export" />
      </AnchorStyled>
    </HyperlinkTooltipStyled>
  );
};

const HyperlinkTooltipStyled = styled.div`
  display: flex;
  align-items: center;
  padding: ${pxToRem(6)} ${pxToRem(8)} ${pxToRem(6)} ${pxToRem(14)};
  background-color: ${props => props.theme.colors.lightBlack};
  border-radius: ${pxToRem(8)};
`;

const HyperlinkTextStyled = styled.span`
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
