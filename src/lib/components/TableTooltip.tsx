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

import { Button } from '../common/Button';
import { Icon } from '../common/Icon/Icon';
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
    }

    return () => {
      tooltipProvider.current?.destroy();
    };
  }, [getEditor, loading, view]);

  return (
    <div className="table-tooltip" ref={ref}>
      {!isWholeTable && !isHeading && isRow && (
        <Button className="oval">
          <Icon icon="arrow_top" />
        </Button>
      )}
      {!isWholeTable && isRow && (
        <Button className="oval">
          <Icon icon="arrow_down" />
        </Button>
      )}
      {!isWholeTable && isCol && (
        <Button className="oval">
          <Icon icon="arrow_left" />
        </Button>
      )}
      {(isWholeTable || !isHeading) && (
        <Button className="oval">
          <Icon icon="delete" />
        </Button>
      )}
      {!isWholeTable && isCol && (
        <Button className="oval">
          <Icon icon="arrow_right" />
        </Button>
      )}
      {!isWholeTable && isCol && (
        <Button className="oval">
          <Icon icon="text_align_left" />
        </Button>
      )}
      {!isWholeTable && isCol && (
        <Button className="oval">
          <Icon icon="text_align_right" />
        </Button>
      )}
      {!isWholeTable && isCol && (
        <Button className="oval">
          <Icon icon="text_align_center" />
        </Button>
      )}

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
        )} */}
    </div>
  );
};
