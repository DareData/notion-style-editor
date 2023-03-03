import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';

export const TextFormats: React.FC = () => (
  <>
    <li className="menubar-item menubar-item-text_formats">
      <Button>
        <Icon icon="bold" />
      </Button>
    </li>
    <li className="menubar-item">
      <Button>
        <Icon icon="italic" />
      </Button>
    </li>
    <li className="menubar-item">
      <Button>
        <Icon icon="underline" />
      </Button>
    </li>
    <li className="menubar-item">
      <Button>
        <Icon icon="strikethrough" />
      </Button>
    </li>
  </>
);
