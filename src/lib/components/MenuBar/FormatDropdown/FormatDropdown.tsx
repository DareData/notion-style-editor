import {
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
} from '@milkdown/preset-commonmark';
import { toggleStrikethroughCommand } from '@milkdown/preset-gfm';
import styled from 'styled-components';

import { Button } from '../../../common/Button';
import {
  Dropdown,
  DropdownButtonActionStyled,
  DropdownItemStyled,
  DropdownListStyled,
} from '../../../common/Dropdown/Dropdown';
import { Icon } from '../../../common/Icon/Icon';
import { useCallEditorCommand } from '../../../hooks/useCallEditorCommand';

export const FormatDropdown = () => {
  const { onCallCommand } = useCallEditorCommand();

  return (
    <DropdownStyled
      handler={({ onToggle }) => (
        <Button onClick={onToggle} oval space="small" color="secondary">
          <Icon icon="format_dropdown" />
        </Button>
      )}
    >
      <DropdownListStyled>
        <DropdownItemStyled>
          <DropdownButtonActionStyled
            onClick={() => onCallCommand(toggleStrongCommand.key)}
          >
            <Icon icon="bold" />
            Bold
          </DropdownButtonActionStyled>
        </DropdownItemStyled>
        <DropdownItemStyled>
          <DropdownButtonActionStyled
            onClick={() => onCallCommand(toggleEmphasisCommand.key)}
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
            onClick={() => onCallCommand(toggleStrikethroughCommand.key)}
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
          onClick={() => onCallCommand(wrapInBulletListCommand.key)}
        >
          <DropdownButtonActionStyled>
            <Icon icon="bulleted_list" />
            Bullet list
          </DropdownButtonActionStyled>
        </DropdownItemStyled>
        <DropdownItemStyled>
          <DropdownButtonActionStyled
            onClick={() => onCallCommand(wrapInOrderedListCommand.key)}
          >
            <Icon icon="numbered_list" />
            Numbered list
          </DropdownButtonActionStyled>
        </DropdownItemStyled>
      </DropdownListStyled>
    </DropdownStyled>
  );
};

const DropdownStyled = styled(Dropdown)`
  margin-left: auto;
`;
