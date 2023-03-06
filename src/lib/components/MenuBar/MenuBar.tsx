import { CmdKey } from '@milkdown/core';
import { callCommand } from '@milkdown/utils';

import { Actions } from './Actions';
import { EmbedObjects } from './EmbedObjects';
import { ParagraphFormat } from './ParagraphFormat';
import { ScriptActions } from './ScriptActions';
import { TextFormats } from './TextFormats';
import { useEditorContext } from '../EditorContext/useEditorContext';

export const MenuBar = () => {
  const { editor } = useEditorContext();

  const onActionClick = <T,>(command: CmdKey<T>) => {
    editor?.get()?.action(callCommand(command));
  };

  return (
    <ul className="menubar">
      <Actions {...{ onActionClick }} />
      <TextFormats {...{ onActionClick }} />
      <ParagraphFormat {...{ onActionClick }} />
      <ScriptActions />
      <EmbedObjects {...{ onActionClick }} />
    </ul>
  );
};
