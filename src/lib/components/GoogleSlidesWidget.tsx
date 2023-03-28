import { useWidgetViewContext } from '@prosemirror-adapter/react';

export const GoogleSlidesWidget: React.FC = () => {
  const { spec } = useWidgetViewContext();
  const { href } = spec as { href?: string };
  if (!href) {
    return null;
  }

  const newHref = href.replace('pub', 'embed');

  return <iframe src={newHref} />;
};
