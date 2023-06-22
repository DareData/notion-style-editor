import { useNodeViewContext } from '@prosemirror-adapter/react';

import { FileNode } from './FileNode/FileNode';
import { ImageNode } from './ImageNode/ImageNode';

const formatRegex = /^http.*\.(jpeg|jpg|gif|png|tiff|bmp|eps|svg)$/;

export const DocumentNode: React.FC = () => {
  const { node } = useNodeViewContext();
  const { attrs } = node;

  const isImage =
    attrs.src.match(formatRegex) !== null || attrs.src.includes('data:image/');

  if (isImage) {
    return <ImageNode />;
  }

  return <FileNode />;
};
