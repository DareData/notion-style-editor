import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';

export const ScriptActions: React.FC = () => (
  <>
    <li className="menubar-item menubar-item-script_actions">
      <Button>
        <Icon icon="superscript" />
      </Button>
    </li>
    <li className="menubar-item">
      <Button>
        <Icon icon="subscript" />
      </Button>
    </li>
  </>
);
