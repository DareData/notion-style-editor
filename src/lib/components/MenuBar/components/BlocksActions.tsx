import { insertDiagramCommand } from '@milkdown/plugin-diagram';
import {
  createCodeBlockCommand,
  insertImageCommand,
} from '@milkdown/preset-commonmark';
import { insertTableCommand } from '@milkdown/preset-gfm';
import { useWidgetViewContext } from '@prosemirror-adapter/react';
import { useCallback, useState } from 'react';
import styled, { useTheme } from 'styled-components';

import { Button } from '../../../common/Button';
import { Icon } from '../../../common/Icon/Icon';
import { useCallEditorCommand } from '../../../hooks/useCallEditorCommand';
import { useInsertMathBlock } from '../../../hooks/useInsertMathAction';
import { theme } from '../../../styles/theme';
import { pxToRem } from '../../../styles/utils';
import { AddDocumentModal } from '../../AddDocumentModal/AddDocumentModal';
import { AddGoogleSlidesModal } from '../../AddGoogleSlidesModal/AddGoogleSlidesModal';
import { LinkModal } from '../../LinkModal/LinkModal';

export const BlocksActions: React.FC = () => {
  const [selectedText, setSelectedText] = useState('');

  const { colors } = useTheme();
  const { onCallCommand } = useCallEditorCommand();
  const { onInsertMathBlock } = useInsertMathBlock();
  const {
    view: { state },
  } = useWidgetViewContext();

  const onModalOpen = useCallback(() => {
    const { selection, doc } = state;

    const { from, to } = selection;
    const text = doc.textBetween(from, to) || '';

    setSelectedText(text);
  }, [state]);

  const onModalClose = useCallback(() => setSelectedText(''), []);

  return (
    <>
      <HyperlinkModalItemStyled>
        <LinkModal
          editable={false}
          text={selectedText}
          {...{ onModalOpen, onModalClose }}
          handler={({ onOpen }) => (
            <Button
              oval
              onClick={onOpen}
              space="small"
              color="secondary"
              data-testid="add-link-button"
            >
              <Icon icon="add_link" />
            </Button>
          )}
        />
      </HyperlinkModalItemStyled>
      <li>
        <AddDocumentModal
          handler={({ onOpen }) => (
            <Button
              oval
              space="small"
              color="secondary"
              onClick={onOpen}
              data-testid="add-document-button"
            >
              <Icon icon="embed_image" />
            </Button>
          )}
          onInsert={source =>
            onCallCommand(insertImageCommand.key, { src: source })
          }
        />
      </li>
      <li>
        <Button
          onClick={() => onCallCommand(createCodeBlockCommand.key)}
          oval
          space="small"
          color="secondary"
          data-testid="add-code-block-button"
        >
          <Icon icon="code_block" />
        </Button>
      </li>
      <li>
        <Button
          onClick={() => onCallCommand(insertTableCommand.key)}
          oval
          space="small"
          color="secondary"
          data-testid="add-table-button"
        >
          <Icon icon="create_table" />
        </Button>
      </li>
      <li>
        <Button
          onClick={onInsertMathBlock}
          oval
          space="small"
          color="secondary"
          data-testid="add-math-button"
        >
          <Icon icon="math" />
        </Button>
      </li>
      <li>
        <Button
          onClick={() => onCallCommand(insertDiagramCommand.key)}
          oval
          space="small"
          color="secondary"
          data-testid="add-mermaid-button"
        >
          <Icon icon="mermaid" />
        </Button>
      </li>
      <li>
        <AddGoogleSlidesModal
          handler={({ onOpen }) => (
            <Button
              onClick={onOpen}
              oval
              space="small"
              color="secondary"
              data-testid="add-slide-show-button"
            >
              <Icon icon="google" fill={colors.white} />
            </Button>
          )}
        />
      </li>
    </>
  );
};

const HyperlinkModalItemStyled = styled.li`
  @media (min-width: ${theme.queries.menuWithSpace}) {
    margin-left: ${pxToRem(12)};
  }
`;
