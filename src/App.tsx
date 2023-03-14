import styled from 'styled-components';

import { TextEditor } from './lib';

const data = `# Milkdown React Commonmark

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **React**.

Lorem ipsum dolor re arcu. Praesent lacus diam, laoreet et nisi sit amet, interdum tristique enim.

Morbi sapien tortor, suscipit in consectetur eu, finibus a turpis. Mauris scelerisque nisl quis purus pulvinar laoreet tincidunt ut nisl.

Donec nec arcu eget purus molestie vulputate. Pellentesque pulvinar elementum posuere. Maecenas gravida, arcu ac sagittis aliquet,
In faucibus sapien sed massa feugiat, eget pulvinar leo facilisis.

uisque ullamcorper turpis vel elit elementum, sit

[Enourmous link to click](https://www.figma.com/file/5WIlxYLOmbxAqJLPIZyCSB/Text-editor?node-id=139%3A4912&t=7Lvphd0ggzxtpmxn-0)

\`\`\`c
function main() {
  console.log('Hello milkdown!');
}
\`\`\`


| Header   |   Header   | Header |
| -------------- | ----------------   | -------------- |
| Content Cell 1 |  Content Cell 1    | Cell 3         |
| Content Cell 2 | **Content** Cell 2 | Cell 3         |


`;

export const App = () => (
  <div>
    <TextEditorStyled onDataChange={() => {}} {...{ data }} />
  </div>
);

const TextEditorStyled = styled(TextEditor)`
  width: 1000px;
`;
