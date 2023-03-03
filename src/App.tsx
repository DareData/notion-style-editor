import { TextEditor } from './lib';

const data = `# Milkdown React Commonmark

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **React**.`;

export const App = () => (
  <div>
    <TextEditor onDataChange={() => {}} {...{ data }} />
  </div>
);
