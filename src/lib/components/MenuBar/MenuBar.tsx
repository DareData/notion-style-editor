import { CmdKey } from '@milkdown/core';
import { callCommand } from '@milkdown/utils';

import { Actions } from './Actions';
import { EmbedObjects } from './EmbedObjects';
import { ParagraphFormat } from './ParagraphFormat';
import { ScriptActions } from './ScriptActions';
import { TextCreation } from './TextCreation';
import { TextFormats } from './TextFormats';
import { useEditorContext } from '../EditorContext/useEditorContext';

export const MenuBar = () => {
  const { editor } = useEditorContext();

  const onActionClick = <T,>(command: CmdKey<T>, payload?: T | undefined) => {
    editor?.get()?.action(callCommand(command, payload));
  };

  return (
    <ul className="menubar">
      <Actions {...{ onActionClick }} />
      <TextCreation {...{ onActionClick }} />
      <TextFormats {...{ onActionClick }} />
      <ScriptActions />
      <ParagraphFormat {...{ onActionClick }} />
      <EmbedObjects {...{ onActionClick }} />
    </ul>
  );
};
