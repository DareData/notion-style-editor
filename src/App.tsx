import styled, { createGlobalStyle } from 'styled-components';

import { TextEditor } from './lib';
import { pxToRem } from './lib/styles/utils';

const data = `# Milkdown React Commonmark

![avatar](https://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-061-e1340955308953.jpg)

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **React**.

Lorem ipsum dolor re arcu. Praesent lacus diam, laoreet et nisi sit amet, interdum tristique enim.


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
  <>
    <AppGlobalStyles />
    <AppContainerStyled>
      <TextEditorStyled onDataChange={() => {}} {...{ data }} />
    </AppContainerStyled>
  </>
);

const TextEditorStyled = styled(TextEditor)`
  width: 1000px;
`;

const AppContainerStyled = styled.div`
  margin: ${pxToRem(100)} 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AppGlobalStyles = createGlobalStyle`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  background-color: #FFFFFF;
`;
