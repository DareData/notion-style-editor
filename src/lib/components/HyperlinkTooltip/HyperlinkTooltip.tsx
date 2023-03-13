import { tooltipFactory, TooltipProvider } from '@milkdown/plugin-tooltip';
import { TextSelection } from '@milkdown/prose/state';
import { useInstance } from '@milkdown/react';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import { useEffect, useRef } from 'react';

import { useHyperlinkAttrs } from './useHyperlinkAttrs';
import { Anchor } from '../../common/Anchor';
import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';
import { Modal } from '../../common/Modal/Modal';

export const hyperlinktooltip = tooltipFactory('HYPERLINK');

export const HyperlinkTooltip: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const tooltipProvider = useRef<TooltipProvider>();

  const [loading] = useInstance();
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

  return (
    <div ref={ref} className="hyperlink-tooltip">
      <span className="hyperlink-tooltip_href">{href}</span>
      <Modal
        handler={({ onOpen }) => (
          <Button className="oval" onClick={onOpen}>
            <Icon icon="edit" />
          </Button>
        )}>
        <div className="modal-header">Add a link</div>
      </Modal>
      <Anchor {...{ href }} target="_blank" type="anchor-button">
        <Icon icon="export" />
      </Anchor>
    </div>
  );
};
