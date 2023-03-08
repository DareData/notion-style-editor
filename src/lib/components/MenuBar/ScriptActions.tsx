import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';

export const ScriptActions: React.FC = () => (
  <>
    <li className="menubar-item menubar-item-script_actions">
      {/* add missing superscript command */}
      <Button className="oval">
        <Icon icon="superscript" />
      </Button>
    </li>
    <li className="menubar-item">
      {/* add missing subscript command */}
      <Button className="oval">
        <Icon icon="subscript" />
      </Button>
    </li>
  </>
);
