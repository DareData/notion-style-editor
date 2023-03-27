import { useMemo } from 'react';

import { ReactComponent as AddLinkIcon } from './assets/add_link.svg';
import { ReactComponent as ArrowDownIcon } from './assets/arrow_down.svg';
import { ReactComponent as ArrowLeftIcon } from './assets/arrow_left.svg';
import { ReactComponent as ArrowRightIcon } from './assets/arrow_right.svg';
import { ReactComponent as ArrowTopIcon } from './assets/arrow_top.svg';
import { ReactComponent as BoldIcon } from './assets/bold.svg';
import { ReactComponent as BulletedList } from './assets/bulleted_list.svg';
import { ReactComponent as CloseIcon } from './assets/close.svg';
import { ReactComponent as CodeBlockIcon } from './assets/code_block.svg';
import { ReactComponent as CopyIcon } from './assets/copy.svg';
import { ReactComponent as CreateTableIcon } from './assets/create_table.svg';
import { ReactComponent as DragAndDropFileIcon } from './assets/d_and_d_file.svg';
import { ReactComponent as DeleteIcon } from './assets/delete.svg';
import { ReactComponent as EditIcon } from './assets/edit.svg';
import { ReactComponent as EmbedImageIcon } from './assets/embed_image.svg';
import { ReactComponent as ExportIcon } from './assets/export.svg';
import { ReactComponent as FormatDropdownIcon } from './assets/format_dropdown.svg';
import { ReactComponent as GoogleIcon } from './assets/google.svg';
import { ReactComponent as ItalicIcon } from './assets/italic.svg';
import { ReactComponent as MathIcon } from './assets/math.svg';
import { ReactComponent as MermaidIcon } from './assets/mermaid.svg';
import { ReactComponent as NumberedListIcon } from './assets/numbered_list.svg';
import { ReactComponent as ParagraphIcon } from './assets/paragraph.svg';
import { ReactComponent as RedoIcon } from './assets/redo.svg';
import { ReactComponent as SettingsIcon } from './assets/settings.svg';
import { ReactComponent as StrikethroughIcon } from './assets/strikethrough.svg';
import { ReactComponent as SubScriptIcon } from './assets/subscript.svg';
import { ReactComponent as SubtitleIcon } from './assets/subtitle.svg';
import { ReactComponent as SuperScriptIcon } from './assets/superscript.svg';
import { ReactComponent as TextAlignCenterIcon } from './assets/text_align_center.svg';
import { ReactComponent as TextAlignLeftIcon } from './assets/text_align_left.svg';
import { ReactComponent as TextAlignRightIcon } from './assets/text_align_right.svg';
import { ReactComponent as TitleIcon } from './assets/title.svg';
import { ReactComponent as UnderlineIcon } from './assets/underline.svg';
import { ReactComponent as UndoIcon } from './assets/undo.svg';

const icons = {
  redo: RedoIcon,
  undo: UndoIcon,
  bold: BoldIcon,
  italic: ItalicIcon,
  copy: CopyIcon,
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
  arrow_down: ArrowDownIcon,
  arrow_top: ArrowTopIcon,
  delete: DeleteIcon,
  text_align_left: TextAlignLeftIcon,
  text_align_right: TextAlignRightIcon,
  text_align_center: TextAlignCenterIcon,
  arrow_left: ArrowLeftIcon,
  arrow_right: ArrowRightIcon,
  edit: EditIcon,
  export: ExportIcon,
  d_a_d_file: DragAndDropFileIcon,
  close: CloseIcon,
  mermaid: MermaidIcon,
  math: MathIcon,
  title: TitleIcon,
  subtitle: SubtitleIcon,
  paragraph: ParagraphIcon,
  format_dropdown: FormatDropdownIcon,
  settings: SettingsIcon,
  google: GoogleIcon,
};

export const IconTypesValues = Object.keys(icons) as IconTypes[];
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
