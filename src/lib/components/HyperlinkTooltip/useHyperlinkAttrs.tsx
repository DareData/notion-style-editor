import { usePluginViewContext } from '@prosemirror-adapter/react';

export const useHyperlinkAttrs = () => {
  const { view } = usePluginViewContext();

  const { state } = view;
  const { selection } = state;

  const node = state.doc.nodeAt(selection.from);

  const mark = node?.marks.find(mark => mark.type.name === 'link');

  return {
    href: mark?.attrs.href,
    title: mark?.attrs.title,
  };
};
