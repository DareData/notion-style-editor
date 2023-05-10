import {
  liftListItemCommand,
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
} from '@milkdown/preset-commonmark';
import { useWidgetViewContext } from '@prosemirror-adapter/react';
import { Selection } from 'prosemirror-state';

import { useCallEditorCommand } from '../../../hooks/useCallEditorCommand';

const isListActive = (selection: Selection, listType: string) => {
  const { $from, $to } = selection;

  return !!$from.blockRange(
    $to,
    node => node.childCount > 0 && node.type.name === listType
  );
};

export const useListWrap = () => {
  const { view } = useWidgetViewContext();
  const { state } = view;
  const { selection } = state;

  const { onCallCommand } = useCallEditorCommand();

  const onBulletListToggle = () => {
    if (isListActive(selection, 'bullet_list')) {
      onCallCommand(liftListItemCommand.key);
    } else {
      onCallCommand(wrapInBulletListCommand.key);
    }
  };

  const onOrderedListToggle = () => {
    if (isListActive(selection, 'ordered_list')) {
      onCallCommand(liftListItemCommand.key);
    } else {
      onCallCommand(wrapInOrderedListCommand.key);
    }
  };

  return {
    onBulletListToggle,
    onOrderedListToggle,
  };
};
