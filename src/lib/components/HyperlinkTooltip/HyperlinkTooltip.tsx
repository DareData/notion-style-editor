import { commandsCtx } from '@milkdown/core';
import { tooltipFactory, TooltipProvider } from '@milkdown/plugin-tooltip';
import { updateLinkCommand } from '@milkdown/preset-commonmark';
import { TextSelection } from '@milkdown/prose/state';
import { useInstance } from '@milkdown/react';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import { useEffect, useRef } from 'react';

import { useHyperlinkAttrs } from './useHyperlinkAttrs';
import { Anchor } from '../../common/Anchor';
import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';
import { Modal } from '../../common/Modal/Modal';
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
    <div ref={ref} className="hyperlink-tooltip">
      <span className="hyperlink-tooltip_href">{href}</span>
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
    </div>
  );
};
