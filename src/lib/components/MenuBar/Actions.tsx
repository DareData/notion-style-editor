import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';

export const Actions: React.FC = () => (
  <>
    <li className="menubar-item">
      <Button>
        <Icon icon="redo" />
      </Button>
    </li>
    <li className="menubar-item">
      <Button>
        <Icon icon="undo" />
      </Button>
    </li>
  </>
);
