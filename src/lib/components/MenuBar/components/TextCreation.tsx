import { CmdKey } from '@milkdown/core';
import {
  turnIntoTextCommand,
  wrapInHeadingCommand,
} from '@milkdown/preset-commonmark';
import { Option } from 'react-dropdown';
import styled from 'styled-components';

import { Select } from '../../../common/Select';
import { theme } from '../../../styles/theme';
import { pxToRem } from '../../../styles/utils';
import { Matcher } from '../../../utils/Matcher';

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
  const onSelectChange = ({ value }: Option) => {
    Matcher(value)
      .match('title', () => onActionClick(wrapInHeadingCommand.key, 1))
      .match('subtitle', () => onActionClick(wrapInHeadingCommand.key, 2))
      .match('normal', () => onActionClick(turnIntoTextCommand.key));
  };

  return (
    <SelectStyled
      options={textCreationOptions}
      placeholder="Select text.."
      onChange={onSelectChange}
    />
  );
};

const SelectStyled = styled(Select)`
  margin-left: ${pxToRem(12)};
  .Dropdown-control {
    background-color: rgba(31, 31, 31, 0.8);
    .Dropdown-placeholder {
      color: ${props => props.theme.colors.white};
    }
    .Dropdown-arrow-wrapper svg {
      fill: ${props => props.theme.colors.white};
    }
  }
`;
