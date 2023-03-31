import { usePluginViewContext } from '@prosemirror-adapter/react';

import { Strings } from '../../../utils/Strings';

export const useHyperlinkAttrs = () => {
  const { view } = usePluginViewContext();

  const { state } = view;
  const { selection } = state;

  const node = state.doc.nodeAt(selection.from);

  const mark = node?.marks.find(mark => mark.type.name === 'link');

  return {
    href: Strings(mark?.attrs.href).getOrElse(() => ''),
    title: Strings(mark?.attrs.title).getOrElse(() => ''),
  };
};
