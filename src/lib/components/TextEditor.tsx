type TextEditorProps = {
  data: string;
  onChange: (data: string) => void;
};

export const TextEditor: React.FC<TextEditorProps> = ({ onChange, data }) => (
  <div>Text editor</div>
);
