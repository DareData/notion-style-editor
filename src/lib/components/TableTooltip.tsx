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

import { tableTooltipCtx } from '../hooks/useGfmPlugin/useGfmPlugin';

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

      console.log('provider: ', provider);
    }

    return () => {
      tooltipProvider.current?.destroy();
    };
  }, [getEditor, loading, view]);

  console.log('kurwa xD');

  return (
    <div>
      <div className="flex" ref={ref}>
        <div>Dupa xD</div>
        {/* {!isWholeTable && !isHeading && isRow && (
          <TooltipButton
            icon="arrow_upward"
            onClick={() => {
              if (loading) return;

              getEditor().action(ctx => {
                ctx.get(commandsCtx).call(addRowBeforeCommand.key);
              });
              tooltipProvider.current?.hide();
            }}
          />
        )}
        {!isWholeTable && isCol && (
          <TooltipButton
            icon="arrow_back"
            onClick={() => {
              if (loading) return;
              getEditor().action(ctx => {
                ctx.get(commandsCtx).call(addColBeforeCommand.key);
              });

              tooltipProvider.current?.hide();
            }}
          />
        )}
        {(isWholeTable || !isHeading) && (
          <TooltipButton
            icon="delete"
            onClick={() => {
              if (loading) return;

              getEditor().action(ctx => {
                ctx.get(commandsCtx).call(deleteSelectedCellsCommand.key);
              });
              tooltipProvider.current?.hide();
            }}
          />
        )}
        {!isWholeTable && isRow && (
          <TooltipButton
            icon="arrow_downward"
            onClick={() => {
              if (loading) return;

              getEditor().action(ctx => {
                ctx.get(commandsCtx).call(addRowAfterCommand.key);
              });
              tooltipProvider.current?.hide();
            }}
          />
        )}
        {!isWholeTable && isCol && (
          <TooltipButton
            icon="arrow_forward"
            onClick={() => {
              if (loading) return;
              getEditor().action(ctx => {
                ctx.get(commandsCtx).call(addColAfterCommand.key);
              });

              tooltipProvider.current?.hide();
            }}
          />
        )}
        {!isWholeTable && isCol && (
          <TooltipButton
            icon="format_align_left"
            onClick={() => {
              if (loading) return;
              getEditor().action(ctx => {
                ctx.get(commandsCtx).call(setAlignCommand.key, 'left');
              });
            }}
          />
        )}
        {!isWholeTable && isCol && (
          <TooltipButton
            icon="format_align_center"
            onClick={() => {
              if (loading) return;
              getEditor().action(ctx => {
                ctx.get(commandsCtx).call(setAlignCommand.key, 'center');
              });
            }}
          />
        )}
        {!isWholeTable && isCol && (
          <TooltipButton
            icon="format_align_right"
            onClick={() => {
              if (loading) return;
              getEditor().action(ctx => {
                ctx.get(commandsCtx).call(setAlignCommand.key, 'right');
              });
            }}
          />
        )} */}
      </div>
    </div>
  );
};
