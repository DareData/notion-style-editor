import { CmdKey } from '@milkdown/core';
import {
  turnIntoTextCommand,
  wrapInHeadingCommand,
} from '@milkdown/preset-commonmark';
import { Option } from 'react-dropdown';

import { Dropdown } from '../../common/Dropdown';
import { Matcher } from '../../utils/Matcher';

const textCreationOptions: Option[] = [
  { value: 'title', label: 'Title' },
  { value: 'subtitle', label: 'Subtitle' },
  { value: 'normal', label: 'Normal Text' },
];

type TextCreationProps = {
  onActionClick: <T>(action: CmdKey<T>, payload?: T) => void;
};

export const TextCreation: React.FC<TextCreationProps> = ({
  onActionClick,
}) => {
  const onDropdownChange = ({ value }: Option) => {
    Matcher(value)
      .match('title', () => onActionClick(wrapInHeadingCommand.key, 1))
      .match('subtitle', () => onActionClick(wrapInHeadingCommand.key, 2))
      .match('normal', () => onActionClick(turnIntoTextCommand.key));
  };

  return (
    <Dropdown
      options={textCreationOptions}
      placeholder="Select text.."
      onChange={onDropdownChange}
      className="text-creation-dropdown black"
    />
  );
};
