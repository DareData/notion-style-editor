import { Plugin, PluginKey } from '@milkdown/prose/state';
import type { Decoration } from '@milkdown/prose/view';
import { DecorationSet } from '@milkdown/prose/view';
import { $prose } from '@milkdown/utils';
import { useWidgetViewFactory } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

import { MenuBar } from '../../../components/MenuBar/MenuBar';

export const useMenuBarPlugin = () => {
  const widgetViewFactory = useWidgetViewFactory();

  const createMenuBarWidget = useMemo(
    () =>
      widgetViewFactory({
        as: 'div',
        component: MenuBar,
      }),
    [widgetViewFactory]
  );

  const menuBarPlugin = useMemo(
    () =>
      $prose(() => {
        const key = new PluginKey('MILKDOWN_MENU_BAR');
        return new Plugin({
          key,
          state: {
            init(config, instance) {
              const decorations: Decoration[] = [createMenuBarWidget(0)];

              return {
                decorations: DecorationSet.create(instance.doc, decorations),
                pos: 0,
              };
            },
            apply(tr) {
              // const { selection } = newState;
              // const { from, $from, to, empty } = selection;
              // if (empty) {
              //   const is = strongSchema
              //     .type()
              //     .isInSet(newState.storedMarks || $from.marks());
              //   console.log('is: ', is);
              // } else {
              //   const a = newState.doc.rangeHasMark(
              //     from,
              //     to,
              //     strongSchema.type()
              //   );
              //   console.log('a: ', a);
              // }
              //             let {from, $from, to, empty} = state.selection
              // if (empty) return !!type.isInSet(state.storedMarks || $from.marks())
              // else return state.doc.rangeHasMark(from, to, type)
              const decorations: Decoration[] = [createMenuBarWidget(0)];
              return {
                decorations: DecorationSet.create(tr.doc, decorations),
                pos: 0,
              };
            },
          },
          props: {
            decorations(state) {
              return key.getState(state).decorations;
            },
          },
        });
      }),
    [createMenuBarWidget]
  );

  return menuBarPlugin;
};
