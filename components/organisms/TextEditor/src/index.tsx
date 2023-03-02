import { EditorState, $getRoot, $getSelection } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import {
  TRANSFORMERS,
  $convertFromMarkdownString,
  $convertToMarkdownString,
} from '@lexical/markdown';
import styled from '@emotion/styled';

import ListMaxIndentLevelPlugin from '../plugins/ListMaxIndentLevelPlugin';
import CodeHighlightPlugin from '../plugins/CodeHighlightPlugin';
import AutoLinkPlugin from '../plugins/AutoLinkPlugin';
import TreeViewPlugin from '../plugins/TreeViewPlugin';
import ToolbarPlugin from '../plugins/ToolbarPlugin';
import ExampleTheme from '../themes';

const theme = {
  // Theme styling goes here
};

const editorConfig = {
  editorState: () => $convertFromMarkdownString('## Test', TRANSFORMERS),
  namespace: 'Editor',
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

type Props = {
  className?: string;
};

const Placeholder = styled.div`
  color: #999;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  top: 15px;
  left: 10px;
  font-size: 15px;
  user-select: none;
  display: inline-block;
  pointer-events: none;
`;

function onChange(editorState: EditorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
    console.log($convertToMarkdownString(TRANSFORMERS));
  });
}

export function TextEditor({ className }: Props) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={<ContentEditable className={className} />}
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <TreeViewPlugin />
      <AutoFocusPlugin />
      <CodeHighlightPlugin />
      <ListPlugin />
      <LinkPlugin />
      <AutoLinkPlugin />
      <ListMaxIndentLevelPlugin maxDepth={7} />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <OnChangePlugin onChange={onChange} />
    </LexicalComposer>
  );
}
