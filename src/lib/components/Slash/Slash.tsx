import { useRef } from 'react';
import styled from 'styled-components';

import { useSlashProvider } from './hooks/useSlashProvider';
import { Button } from '../../common/Button';
import { Hidden } from '../../common/Hidden';
import { Icon } from '../../common/Icon/Icon';
import { pxToRem } from '../../styles/utils';

export const Slash: React.FC = () => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useSlashProvider({ tooltipRef });

  return (
    <Hidden>
      <div ref={tooltipRef}>
        <SlashListStyled>
          <SlashItemStyled>
            <AddActionButtonStyled>
              <Icon icon="title" />
              Title
            </AddActionButtonStyled>
          </SlashItemStyled>
          <SlashItemStyled>
            <AddActionButtonStyled>
              <Icon icon="subtitle" />
              Subtitle
            </AddActionButtonStyled>
          </SlashItemStyled>
          <SlashItemStyled>
            <AddActionButtonStyled>
              <Icon icon="paragraph" />
              Normal text
            </AddActionButtonStyled>
          </SlashItemStyled>
          <SlashItemStyled>
            <AddActionButtonStyled>
              <Icon icon="add_link" />
              Add link
            </AddActionButtonStyled>
          </SlashItemStyled>
          <SlashItemStyled>
            <AddActionButtonStyled>
              <Icon icon="embed_image" />
              Add image
            </AddActionButtonStyled>
          </SlashItemStyled>
          <SlashItemStyled>
            <AddActionButtonStyled>
              <Icon icon="code_block" />
              Add code
            </AddActionButtonStyled>
          </SlashItemStyled>
          <SlashItemStyled>
            <AddActionButtonStyled>
              <Icon icon="create_table" />
              Add table
            </AddActionButtonStyled>
          </SlashItemStyled>
          <SlashItemStyled>
            <AddActionButtonStyled>
              <Icon icon="math" />
              Add math
            </AddActionButtonStyled>
          </SlashItemStyled>
          <SlashItemStyled>
            <AddActionButtonStyled>
              <Icon icon="mermaid" />
              Add diagram
            </AddActionButtonStyled>
          </SlashItemStyled>
        </SlashListStyled>
      </div>
    </Hidden>
  );
};

const SlashListStyled = styled.ul`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${pxToRem(8)};
  border: 1px solid ${props => props.theme.colors.lightGrey};
`;

const SlashItemStyled = styled.li`
  list-style-type: none;
`;

const AddActionButtonStyled = styled(Button)`
  width: 100%;
  justify-content: flex-start;
  gap: ${pxToRem(10)};
  padding: ${pxToRem(14)} ${pxToRem(20)};
  min-width: ${pxToRem(200)};
`;
