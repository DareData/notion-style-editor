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

import { tableTooltipCtx } from '../hooks/useGfmPlugin/useGfmPlugin';

export const TableSelectorWidget: React.FC = () => {
  const { spec } = useWidgetViewContext();
  const type = spec?.type;
  const index = spec?.index ?? 0;
  const [loading, getEditor] = useInstance();
  const ref = useRef<HTMLDivElement>(null);

  const [dragOver, setDragOver] = useState(false);

  const common = useMemo(
    () =>
      clsx(
        'hover:bg-nord8 hover:dark:bg-nord9 absolute cursor-pointer bg-gray-200 dark:bg-gray-600',
        dragOver ? 'ring-2' : ''
      ),
    [dragOver]
  );

  const className = useMemo(() => {
    if (type === 'left') return 'w-2 h-full -left-3.5 top-0';

    if (type === 'top') return 'right-px h-2 left-0 -top-3.5';

    return 'h-3 w-3 -left-4 -top-4 rounded-full';
  }, [type]);

  return (
    <div
      ref={ref}
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
