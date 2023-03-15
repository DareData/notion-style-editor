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
import { useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { tableTooltipCtx } from './EditorContext/hooks/useGfmPlugin/useGfmPlugin';
import { Button, ButtonProps } from '../common/Button';
import { pxToRem } from '../styles/utils';
import { Matcher } from '../utils/Matcher';

type WidgetPosition = 'row' | 'column' | 'table';

const getWidgetPosition = (type: string): WidgetPosition =>
  Matcher(type)
    .match('left', () => 'row')
    .match('top', () => 'column')
    .getOrElse(() => 'table') as WidgetPosition;

export const TableSelectorWidget: React.FC = () => {
  const { spec } = useWidgetViewContext();
  const type = spec?.type;
  const index = spec?.index ?? 0;
  const [loading, getEditor] = useInstance();
  const ref = useRef<HTMLButtonElement>(null);

  const [dragOver, setDragOver] = useState(false);

  const position = useMemo(() => getWidgetPosition(type), [type]);

  return (
    <ButtonWidgetStyled
      ref={ref}
      prop="secondary"
      draggable={type !== 'top-left'}
      $dragOver={dragOver}
      $position={position}
      onClick={e => {
        e.stopPropagation();
        const div = ref.current;
        if (loading || !div) {
          return;
        }

        getEditor().action(ctx => {
          const tooltip = ctx.get(tableTooltipCtx.key);
          tooltip?.getInstance()?.setProps({
            getReferenceClientRect: () => div.getBoundingClientRect(),
          });
          tooltip?.show();

          const commands = ctx.get(commandsCtx);

          if (type === 'left') {
            commands.call(selectRowCommand.key, index);
          } else if (type === 'top') {
            commands.call(selectColCommand.key, index);
          } else {
            commands.call(selectTableCommand.key);
          }
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
        if (type === 'top-left') {
          return;
        }
        const i = spec?.index;
        if (loading || i == null) {
          return;
        }
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

const widgetStylesMap = {
  top: {
    row: pxToRem(1),
    column: pxToRem(-10),
    table: pxToRem(-12),
  },
  bottom: {
    row: pxToRem(1),
    column: '',
    table: '',
  },
  left: {
    row: pxToRem(-10),
    column: pxToRem(1),
    table: pxToRem(-12),
  },
  right: {
    row: '',
    column: pxToRem(1),
    table: '',
  },
  width: {
    row: pxToRem(4),
    column: '',
    table: pxToRem(8),
  },
  height: {
    row: '',
    column: pxToRem(4),
    table: pxToRem(8),
  },
};

type ButtonWidget = React.ForwardRefExoticComponent<
  ButtonProps & { $dragOver: boolean; $position: WidgetPosition } & {
    ref: React.Ref<HTMLButtonElement>;
  }
>;
const ButtonWidgetStyled = styled<ButtonWidget>(Button)`
  position: absolute;
  padding: 0;
  background-color: ${props => props.theme.colors.secondaryGrey};
  border-radius: ${pxToRem(1)};
  top: ${props => widgetStylesMap.top[props.$position]};
  bottom: ${props => widgetStylesMap.bottom[props.$position]};
  left: ${props => widgetStylesMap.left[props.$position]};
  right: ${props => widgetStylesMap.right[props.$position]};
  width: ${props => widgetStylesMap.width[props.$position]};
  height: ${props => widgetStylesMap.height[props.$position]};
  ${props =>
    props.$dragOver &&
    css`
      border: 1px solid ${props => props.theme.colors.green};
    `};
  ${props =>
    props.$position === 'table' &&
    css`
      border-radius: 50%;
      opacity: 0.5;
    `}
`;
