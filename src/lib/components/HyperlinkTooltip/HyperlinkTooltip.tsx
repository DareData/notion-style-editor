import { commandsCtx } from '@milkdown/core';
import { tooltipFactory, TooltipProvider } from '@milkdown/plugin-tooltip';
import { updateLinkCommand } from '@milkdown/preset-commonmark';
import { TextSelection } from '@milkdown/prose/state';
import { useInstance } from '@milkdown/react';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { useHyperlinkAttrs } from './useHyperlinkAttrs';
import { Anchor } from '../../common/Anchor';
import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';
import { pxToRem } from '../../styles/utils';
import { HyperlinkModal } from '../HyperlinkModal';

export const hyperlinktooltip = tooltipFactory('HYPERLINK');

export const HyperlinkTooltip: React.FC = () => {
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

  const onHyperlinkSave = (href: string) => {
    if (loading) {
      return;
    }

    getEditor()?.action(ctx => {
      const commands = ctx.get(commandsCtx);
      commands.call(updateLinkCommand.key, { href: 'https://onet.pl' });
    });
  };

  return (
    <HyperlinkTooltipStyled ref={ref}>
      <HyperlinkTextStyled className="hyperlink-tooltip_href">
        {href}
      </HyperlinkTextStyled>
      <HyperlinkModal
        {...{ title, href }}
        handler={({ onOpen }) => (
          <Button className="oval" onClick={onOpen}>
            <Icon icon="edit" />
          </Button>
        )}
        onSave={onHyperlinkSave}
      />
      <Anchor {...{ href }} target="_blank" type="anchor-button">
        <Icon icon="export" />
      </Anchor>
    </HyperlinkTooltipStyled>
  );
};

const HyperlinkTooltipStyled = styled.div`
  display: flex;
  align-items: center;
  padding: ${pxToRem(10)} ${pxToRem(8)};
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
// .hyperlink-tooltip {
//   .button, .anchor {
//     &:hover, &:focus {
//       background-color: transparent !important;
//       border-color: $green;
//     }
//   }
// }
