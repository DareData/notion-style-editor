import { useMemo } from 'react';

import { ReactComponent as AddLinkIcon } from './assets/add_link.svg';
import { ReactComponent as BoldIcon } from './assets/bold.svg';
import { ReactComponent as BulletedList } from './assets/bulleted_list.svg';
import { ReactComponent as CodeBlockIcon } from './assets/code_block.svg';
import { ReactComponent as CreateTableIcon } from './assets/create_table.svg';
import { ReactComponent as EmbedImageIcon } from './assets/embed_image.svg';
import { ReactComponent as ItalicIcon } from './assets/italic.svg';
import { ReactComponent as NumberedListIcon } from './assets/numbered_list.svg';
import { ReactComponent as RedoIcon } from './assets/redo.svg';
import { ReactComponent as StrikethroughIcon } from './assets/strikethrough.svg';
import { ReactComponent as SubScriptIcon } from './assets/subscript.svg';
import { ReactComponent as SuperScriptIcon } from './assets/superscript.svg';
import { ReactComponent as UnderlineIcon } from './assets/underline.svg';
import { ReactComponent as UndoIcon } from './assets/undo.svg';

const icons = {
  redo: RedoIcon,
  undo: UndoIcon,
  bold: BoldIcon,
  italic: ItalicIcon,
  underline: UnderlineIcon,
  strikethrough: StrikethroughIcon,
  superscript: SuperScriptIcon,
  subscript: SubScriptIcon,
  bulleted_list: BulletedList,
  numbered_list: NumberedListIcon,
  add_link: AddLinkIcon,
  embed_image: EmbedImageIcon,
  code_block: CodeBlockIcon,
  create_table: CreateTableIcon,
};

export const IconTypesValues = Object.keys(icons);
export type IconTypes = keyof typeof icons;
export type IconProps = {
  icon: IconTypes;
  fill?: string;
  width?: number;
  height?: number;
};

export const Icon: React.FC<IconProps> = ({
  icon,
  fill = '#1F1F1F',
  width = 18,
  height = 18,
  ...rest
}) => {
  const SVGIcon = useMemo(() => icons[icon], [icon]);

  return SVGIcon && <SVGIcon {...{ width, height, fill }} {...rest} />;
};
