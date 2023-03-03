import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';

export const EmbedObjects: React.FC = () => (
  <>
    <li className="menubar-item menubar-item-embed_objects">
      <Button>
        <Icon icon="add_link" />
      </Button>
    </li>
    <li className="menubar-item">
      <Button>
        <Icon icon="embed_image" />
      </Button>
    </li>
    <li className="menubar-item">
      <Button>
        <Icon icon="code_block" />
      </Button>
    </li>
    <li className="menubar-item">
      <Button>
        <Icon icon="create_table" />
      </Button>
    </li>
  </>
);
