import { EditorStatus, commandsCtx } from '@milkdown/core';
import { TooltipProvider } from '@milkdown/plugin-tooltip';
import {
  addColAfterCommand,
  addColBeforeCommand,
  addRowAfterCommand,
  addRowBeforeCommand,
  deleteSelectedCellsCommand,
  setAlignCommand,
} from '@milkdown/preset-gfm';
import { CellSelection } from '@milkdown/prose/tables';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import { useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components';

import { Button } from '../common/Button';
import { Icon } from '../common/Icon/Icon';
import { useMilkdownInstance } from '../hooks/useMilkdownInstance';
import { tableTooltipCtx } from '../packages/EditorContext/hooks/useGfmPlugin/useGfmPlugin';
import { pxToRem } from '../styles/utils';

export const TableTooltip: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const { view } = usePluginViewContext();
  const tooltipProvider = useRef<TooltipProvider>();
  const { loading, editor } = useMilkdownInstance();

  const isRow =
    view.state.selection instanceof CellSelection &&
    view.state.selection.isRowSelection();
  const isCol =
    view.state.selection instanceof CellSelection &&
    view.state.selection.isColSelection();
  const isWholeTable = isRow && isCol;
  const isHeading =
    isRow &&
    view.state.doc.nodeAt((view.state.selection as CellSelection).$headCell.pos)
      ?.type.name === 'table_header';

  useEffect(() => {
    if (
      ref.current &&
      !loading &&
      !tooltipProvider.current &&
      view &&
      view.state &&
      editor &&
      editor.status !== EditorStatus.Destroyed &&
      editor.status !== EditorStatus.OnDestroy
    ) {
      const provider = new TooltipProvider({
        content: ref.current,
        tippyOptions: {
          zIndex: theme.zIndexes.aboveMenu,
          arrow: false,
        },
        shouldShow: () => {
          return false;
        },
      });

      provider.update(view);

      const editorRef = editor;

      if (
        editorRef &&
        editorRef.ctx &&
        editorRef.ctx.isInjected(tableTooltipCtx.key)
      ) {
        editorRef.ctx.set(tableTooltipCtx.key, provider);
        tooltipProvider.current = provider;
      }
    }

    return () => {
      tooltipProvider.current?.destroy();
    };
  }, [editor, loading, view, ref, tooltipProvider, theme]);

  return (
    <div style={{ display: 'none' }}>
      <TableTooltipContainerStyled
        ref={ref}
        data-testid="table-tooltip-container"
      >
        {!isWholeTable && !isHeading && isRow && (
          <Button
            oval
            space="small"
            color="secondary"
            onClick={() => {
              if (loading || !editor || editor.status !== EditorStatus.Created)
                return;

              editor.action(ctx => {
                ctx.get(commandsCtx).call(addRowBeforeCommand.key);
              });
              tooltipProvider.current?.hide();
            }}
          >
            <Icon icon="add_row_top" />
          </Button>
        )}

        {!isWholeTable && isCol && (
          <Button
            oval
            space="small"
            color="secondary"
            onClick={() => {
              if (loading || !editor || editor.status !== EditorStatus.Created)
                return;

              editor.action(ctx => {
                ctx.get(commandsCtx).call(addColBeforeCommand.key);
              });

              tooltipProvider.current?.hide();
            }}
          >
            <Icon icon="add_column_left" />
          </Button>
        )}
        {(isWholeTable || !isHeading) && (
          <Button
            oval
            space="small"
            color="secondary"
            onClick={() => {
              if (loading || !editor || editor.status !== EditorStatus.Created)
                return;

              editor.action(ctx => {
                ctx.get(commandsCtx).call(deleteSelectedCellsCommand.key);
              });
              tooltipProvider.current?.hide();
            }}
            data-testid="remove-table-button"
          >
            <Icon icon="delete" />
          </Button>
        )}
        {!isWholeTable && isRow && (
          <Button
            oval
            space="small"
            color="secondary"
            onClick={() => {
              if (loading || !editor || editor.status !== EditorStatus.Created)
                return;

              editor.action(ctx => {
                ctx.get(commandsCtx).call(addRowAfterCommand.key);
              });
              tooltipProvider.current?.hide();
            }}
          >
            <Icon icon="add_row_bottom" />
          </Button>
        )}
        {!isWholeTable && isCol && (
          <Button
            oval
            space="small"
            color="secondary"
            onClick={() => {
              if (loading || !editor || editor.status !== EditorStatus.Created)
                return;

              editor.action(ctx => {
                ctx.get(commandsCtx).call(addColAfterCommand.key);
              });

              tooltipProvider.current?.hide();
            }}
          >
            <Icon icon="add_column_right" />
          </Button>
        )}
        {!isWholeTable && isCol && (
          <Button
            oval
            space="small"
            color="secondary"
            onClick={() => {
              if (loading || !editor || editor.status !== EditorStatus.Created)
                return;

              editor.action(ctx => {
                ctx.get(commandsCtx).call(setAlignCommand.key, 'left');
              });
            }}
          >
            <Icon icon="text_align_left" />
          </Button>
        )}
        {!isWholeTable && isCol && (
          <Button
            oval
            space="small"
            color="secondary"
            onClick={() => {
              if (loading || !editor || editor.status !== EditorStatus.Created)
                return;

              editor.action(ctx => {
                ctx.get(commandsCtx).call(setAlignCommand.key, 'right');
              });
            }}
          >
            <Icon icon="text_align_right" />
          </Button>
        )}
        {!isWholeTable && isCol && (
          <Button
            oval
            space="small"
            color="secondary"
            onClick={() => {
              if (loading || !editor || editor.status !== EditorStatus.Created)
                return;

              editor.action(ctx => {
                ctx.get(commandsCtx).call(setAlignCommand.key, 'center');
              });
            }}
          >
            <Icon icon="text_align_center" />
          </Button>
        )}
      </TableTooltipContainerStyled>
    </div>
  );
};

const TableTooltipContainerStyled = styled.div`
  display: flex;
  gap: ${pxToRem(20)};
  align-items: center;
  padding: ${pxToRem(6)} ${pxToRem(15)};
  background-color: ${props => props.theme.colors.white};
  border: ${pxToRem(1)} solid ${props => props.theme.colors.lightGrey};
  border-radius: ${pxToRem(8)};
`;
