import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';

export const ParagraphFormat: React.FC = () => (
  <>
    <li className="menubar-item menubar-item-paragraph_format">
      <Button>
        <Icon icon="bulleted_list" />
      </Button>
    </li>
    <li className="menubar-item">
      <Button>
        <Icon icon="numbered_list" />
      </Button>
    </li>
  </>
);
