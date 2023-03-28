import {
  turnIntoTextCommand,
  wrapInHeadingCommand,
} from '@milkdown/preset-commonmark';
import { Option } from 'react-dropdown';
import styled from 'styled-components';

import { Select } from '../../../common/Select';
import { useCallEditorCommand } from '../../../hooks/useCallEditorCommand';
import { pxToRem } from '../../../styles/utils';
import { Matcher } from '../../../utils/Matcher';

const options: Option[] = [
  { value: 'title', label: 'Title' },
  { value: 'subtitle', label: 'Subtitle' },
  { value: 'normal', label: 'Normal Text' },
];

export const TurnTextsActions: React.FC = () => {
  const { onCallCommand } = useCallEditorCommand();

  const onSelectChange = ({ value }: Option) => {
    Matcher(value)
      .match('title', () => onCallCommand(wrapInHeadingCommand.key, 1))
      .match('subtitle', () => onCallCommand(wrapInHeadingCommand.key, 2))
      .match('normal', () => onCallCommand(turnIntoTextCommand.key));
  };

  return (
    <SelectStyled
      {...{ options }}
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
