import { commandsCtx } from '@milkdown/core';
import {
  moveColCommand,
  moveRowCommand,
  selectColCommand,
  selectRowCommand,
  selectTableCommand,
} from '@milkdown/preset-gfm';
import { useInstance } from '@milkdown/react';
import { useWidgetViewContext } from '@prosemirror-adapter/react';
import clsx from 'clsx';
import { useMemo, useRef, useState } from 'react';

import { Button } from '../common/Button';
import { tableTooltipCtx } from '../hooks/useGfmPlugin/useGfmPlugin';

export const TableSelectorWidget: React.FC = () => {
  const { spec } = useWidgetViewContext();
  const type = spec?.type;
  const index = spec?.index ?? 0;
  const [loading, getEditor] = useInstance();
  const ref = useRef<HTMLButtonElement>(null);

  const [dragOver, setDragOver] = useState(false);

  const common = useMemo(
    () => clsx('table-selector-widget', dragOver ? 'drag-over' : ''),
    [dragOver]
  );

  const className = useMemo(() => {
    if (type === 'left') return 'widget-row';

    if (type === 'top') return 'widget-column';

    return 'widget-table';
  }, [type]);

  return (
    <Button
      ref={ref}
      prop="secondary"
      draggable={type !== 'top-left'}
      className={[className, common].join(' ')}
      onClick={e => {
        e.stopPropagation();
        const div = ref.current;
        if (loading || !div) return;

        getEditor().action(ctx => {
          const tooltip = ctx.get(tableTooltipCtx.key);
          tooltip?.getInstance()?.setProps({
            getReferenceClientRect: () => {
              return div.getBoundingClientRect();
            },
          });
          tooltip?.show();

          const commands = ctx.get(commandsCtx);

          if (type === 'left') commands.call(selectRowCommand.key, index);
          else if (type === 'top') commands.call(selectColCommand.key, index);
          else commands.call(selectTableCommand.key);
        });
      }}
      onDragStart={e => {
        e.stopPropagation();

        const data = { index: spec?.index, type: spec?.type };
        e.dataTransfer.setData(
          'application/milkdown-table-sort',
          JSON.stringify(data)
        );
        e.dataTransfer.effectAllowed = 'move';
      }}
      onDragOver={e => {
        setDragOver(true);
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      }}
      onDragLeave={() => {
        setDragOver(false);
      }}
      onDrop={e => {
        setDragOver(false);
        if (type === 'top-left') return;
        const i = spec?.index;
        if (loading || i == null) return;
        const data = e.dataTransfer.getData('application/milkdown-table-sort');
        try {
          const { index, type } = JSON.parse(data);

          getEditor().action(ctx => {
            const commands = ctx.get(commandsCtx);
            const options = {
              from: Number(index),
              to: i,
            };

            commands.call(
              type === 'left' ? moveRowCommand.key : moveColCommand.key,
              options
            );
          });
        } catch {
          // ignore data from other source
        }
      }}
    />
  );
};
