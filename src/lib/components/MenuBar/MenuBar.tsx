import { Actions } from './Actions';
import { EmbedObjects } from './EmbedObjects';
import { ParagraphFormat } from './ParagraphFormat';
import { ScriptActions } from './ScriptActions';
import { TextFormats } from './TextFormats';

export const MenuBar = () => {
  return (
    <ul className="menubar">
      <Actions />
      <TextFormats />
      <ParagraphFormat />
      <ScriptActions />
      <EmbedObjects />
    </ul>
  );
};
