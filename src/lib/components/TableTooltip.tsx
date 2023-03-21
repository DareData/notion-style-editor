import { commandsCtx } from '@milkdown/core';
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
import { useInstance } from '@milkdown/react';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Button } from '../common/Button';
import { Icon } from '../common/Icon/Icon';
import { tableTooltipCtx } from '../packages/EditorContext/hooks/useGfmPlugin/useGfmPlugin';
import { pxToRem } from '../styles/utils';

export const TableTooltip: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { view } = usePluginViewContext();
  const tooltipProvider = useRef<TooltipProvider>();
  const [loading, getEditor] = useInstance();

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
      view.state
    ) {
      const provider = new TooltipProvider({
        content: ref.current,
        tippyOptions: {
          zIndex: 30,
          arrow: false,
        },
        shouldShow: () => {
          return false;
        },
      });

      provider.update(view);

      const editorRef = getEditor();

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
  }, [getEditor, loading, view]);

  return (
    <TableTooltipContainerStyled ref={ref}>
      {!isWholeTable && !isHeading && isRow && (
        <Button
          oval
          space="small"
          onClick={() => {
            if (loading) return;

            getEditor().action(ctx => {
              ctx.get(commandsCtx).call(addRowBeforeCommand.key);
            });
            tooltipProvider.current?.hide();
          }}
        >
          <Icon icon="arrow_top" />
        </Button>
      )}
      {!isWholeTable && isRow && (
        <Button
          oval
          space="small"
          onClick={() => {
            if (loading) return;

            getEditor().action(ctx => {
              ctx.get(commandsCtx).call(addRowAfterCommand.key);
            });
            tooltipProvider.current?.hide();
          }}
        >
          <Icon icon="arrow_down" />
        </Button>
      )}
      {!isWholeTable && isCol && (
        <Button
          oval
          space="small"
          onClick={() => {
            if (loading) return;
            getEditor().action(ctx => {
              ctx.get(commandsCtx).call(addColBeforeCommand.key);
            });

            tooltipProvider.current?.hide();
          }}
        >
          <Icon icon="arrow_left" />
        </Button>
      )}
      {(isWholeTable || !isHeading) && (
        <Button
          oval
          space="small"
          onClick={() => {
            if (loading) return;

            getEditor().action(ctx => {
              ctx.get(commandsCtx).call(deleteSelectedCellsCommand.key);
            });
            tooltipProvider.current?.hide();
          }}
        >
          <Icon icon="delete" />
        </Button>
      )}
      {!isWholeTable && isCol && (
        <Button
          oval
          space="small"
          onClick={() => {
            if (loading) return;
            getEditor().action(ctx => {
              ctx.get(commandsCtx).call(addColAfterCommand.key);
            });

            tooltipProvider.current?.hide();
          }}
        >
          <Icon icon="arrow_right" />
        </Button>
      )}
      {!isWholeTable && isCol && (
        <Button
          oval
          space="small"
          onClick={() => {
            if (loading) return;
            getEditor().action(ctx => {
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
          onClick={() => {
            if (loading) return;
            getEditor().action(ctx => {
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
          onClick={() => {
            if (loading) return;
            getEditor().action(ctx => {
              ctx.get(commandsCtx).call(setAlignCommand.key, 'center');
            });
          }}
        >
          <Icon icon="text_align_center" />
        </Button>
      )}
    </TableTooltipContainerStyled>
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
