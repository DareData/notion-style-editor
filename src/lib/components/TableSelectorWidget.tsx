import { EditorStatus, commandsCtx } from '@milkdown/core';
import {
  moveColCommand,
  moveRowCommand,
  selectColCommand,
  selectRowCommand,
  selectTableCommand,
} from '@milkdown/preset-gfm';
import { useWidgetViewContext } from '@prosemirror-adapter/react';
import { useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { useTextEditorContext } from './TextEditorContext/useTextEditoContext';
import { Button, ButtonProps } from '../common/Button';
import { useMilkdownInstance } from '../hooks/useMilkdownInstance';
import { tableTooltipCtx } from '../packages/EditorContext/hooks/useGfmPlugin/useGfmPlugin';
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
  const { editor, loading } = useMilkdownInstance();
  const ref = useRef<HTMLButtonElement>(null);
  const { mode } = useTextEditorContext();

  const [dragOver, setDragOver] = useState(false);

  const position = useMemo(() => getWidgetPosition(type), [type]);

  if (mode === 'preview') {
    return null;
  }

  return (
    <ButtonWidgetStyled
      ref={ref}
      space="no"
      draggable={type !== 'top-left'}
      $dragOver={dragOver}
      $position={position}
      data-testid={`table-${position}-tooltip-button`}
      onClick={e => {
        e.stopPropagation();
        const div = ref.current;
        if (
          loading ||
          !div ||
          !editor ||
          editor.status !== EditorStatus.Created
        ) {
          return;
        }

        editor.action(ctx => {
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
        if (
          loading ||
          i == null ||
          !editor ||
          editor.status !== EditorStatus.Created
        ) {
          return;
        }
        const data = e.dataTransfer.getData('application/milkdown-table-sort');
        try {
          const { index, type } = JSON.parse(data);

          editor.action(ctx => {
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
    column: pxToRem(-12),
    table: pxToRem(-12),
  },
  bottom: {
    row: pxToRem(1),
    column: 'auto',
    table: 'auto',
  },
  left: {
    row: pxToRem(-12),
    column: pxToRem(1),
    table: pxToRem(-12),
  },
  right: {
    row: 'auto',
    column: pxToRem(1),
    table: 'auto',
  },
  width: {
    row: pxToRem(8),
    column: 'auto',
    table: pxToRem(8),
  },
  height: {
    row: 'auto',
    column: pxToRem(8),
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
  background-color: ${props => props.theme.colors.secondaryGrey};
  width: ${props => widgetStylesMap.width[props.$position]};
  height: ${props => widgetStylesMap.height[props.$position]};
  border-radius: ${pxToRem(1)};
  inset: ${props => widgetStylesMap.top[props.$position]}
    ${props => widgetStylesMap.right[props.$position]}
    ${props => widgetStylesMap.bottom[props.$position]}
    ${props => widgetStylesMap.left[props.$position]};

  &:hover,
  &:focus {
    background-color: ${props => props.theme.colors.green};
  }
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
