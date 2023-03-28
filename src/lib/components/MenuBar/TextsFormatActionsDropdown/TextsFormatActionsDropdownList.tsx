import { CmdKey } from '@milkdown/core';
import {
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
} from '@milkdown/preset-commonmark';
import { toggleStrikethroughCommand } from '@milkdown/preset-gfm';

import { useDropdownContext } from '../../../common/Dropdown/context/useModalContext';
import {
  DropdownButtonActionStyled,
  DropdownItemStyled,
  DropdownListStyled,
} from '../../../common/Dropdown/Dropdown';
import { Icon } from '../../../common/Icon/Icon';
import { useCallEditorCommand } from '../../../hooks/useCallEditorCommand';

export const TextsFormatActionsDropdownList = () => {
  const { onClose } = useDropdownContext();
  const { onCallCommand } = useCallEditorCommand();

  const onActionClick = <T,>(command: CmdKey<T>) => {
    onClose();
    onCallCommand(command);
  };

  return (
    <DropdownListStyled>
      <DropdownItemStyled>
        <DropdownButtonActionStyled
          onClick={() => onActionClick(toggleStrongCommand.key)}
        >
          <Icon icon="bold" />
          Bold
        </DropdownButtonActionStyled>
      </DropdownItemStyled>
      <DropdownItemStyled>
        <DropdownButtonActionStyled
          onClick={() => onActionClick(toggleEmphasisCommand.key)}
        >
          <Icon icon="italic" />
          Italic
        </DropdownButtonActionStyled>
      </DropdownItemStyled>
      <DropdownItemStyled>
        <DropdownButtonActionStyled>
          <Icon icon="underline" />
          Underline
        </DropdownButtonActionStyled>
      </DropdownItemStyled>
      <DropdownItemStyled>
        <DropdownButtonActionStyled
          onClick={() => onActionClick(toggleStrikethroughCommand.key)}
        >
          <Icon icon="strikethrough" />
          Strikethrough
        </DropdownButtonActionStyled>
      </DropdownItemStyled>
      <DropdownItemStyled>
        <DropdownButtonActionStyled>
          <Icon icon="superscript" />
          Superscript
        </DropdownButtonActionStyled>
      </DropdownItemStyled>
      <DropdownItemStyled>
        <DropdownButtonActionStyled>
          <Icon icon="subscript" />
          Subscript
        </DropdownButtonActionStyled>
      </DropdownItemStyled>
      <DropdownItemStyled
        onClick={() => onActionClick(wrapInBulletListCommand.key)}
      >
        <DropdownButtonActionStyled>
          <Icon icon="bulleted_list" />
          Bullet list
        </DropdownButtonActionStyled>
      </DropdownItemStyled>
      <DropdownItemStyled>
        <DropdownButtonActionStyled
          onClick={() => onActionClick(wrapInOrderedListCommand.key)}
        >
          <Icon icon="numbered_list" />
          Numbered list
        </DropdownButtonActionStyled>
      </DropdownItemStyled>
    </DropdownListStyled>
  );
};
