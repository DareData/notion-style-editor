import styled from 'styled-components';

import { Button } from '../../../common/Button';
import { Icon } from '../../../common/Icon/Icon';
import { theme } from '../../../styles/theme';
import { pxToRem } from '../../../styles/utils';
import { useListWrap } from '../hooks/useListWrap';

export const ListsActions: React.FC = () => {
  const { onBulletListToggle, onOrderedListToggle } = useListWrap();

  return (
    <>
      <BulletListItemStyled>
        <Button
          onClick={onBulletListToggle}
          oval
          space="small"
          color="secondary"
        >
          <Icon icon="bulleted_list" />
        </Button>
      </BulletListItemStyled>
      <li>
        <Button
          onClick={onOrderedListToggle}
          oval
          space="small"
          color="secondary"
        >
          <Icon icon="numbered_list" />
        </Button>
      </li>
    </>
  );
};

const BulletListItemStyled = styled.li`
  margin-left: ${pxToRem(2)};

  @media (min-width: ${theme.queries.menuWithSpace}) {
    margin-left: ${pxToRem(12)};
  }
`;
