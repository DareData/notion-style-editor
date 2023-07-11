/* eslint-disable no-useless-escape */
import { useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { ErrorBoundary } from './ErrorBoundary';
import { EditorRef } from './lib/packages/Editor';
import { TextEditor } from './lib/packages/TextEditor';
import { pxToRem } from './lib/styles/utils';

const data = `
# Milkdown React Commonmark

![avatar](https://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-061-e1340955308953.jpg)

> You're scared of a world where you're needed.

This is a demo for using [Milkdown](https://onet.pl) with **React**.

$$
\\begin{aligned}
T( (v_1 + v_2) \otimes w) &= T(v_1 \otimes w) + T(v_2 \otimes w)
\\end{aligned}
$$

[Enourmous link to click](https://www.figma.com/file/5WIlxYLOmbxAqJLPIZyCSB/Text-editor?node-id=139%3A4912&t=7Lvphd0ggzxtpmxn-0)

\`\`\`mermaid
graph TD;
    EditorState-->EditorView;
    EditorView-->DOMEvent;
    DOMEvent-->Transaction;
    Transaction-->EditorState;
\`\`\`

## Text

\`\`\`c
function main() {
  console.log('Hello milkdown!');
}
\`\`\`

Lorem ipsum dolor re arcu. Praesent lacus diam, laoreet et nisi sit amet, interdum tristique enim.

| Header   |   Header   | Header |
| -------------- | ----------------   | -------------- |
| Content Cell 1 |  Content Cell 1    | Cell 3         |
| Content Cell 2 | **Content** Cell 2 | Cell 3         |

`;

export const App = () => {
  const [text, setText] = useState('');
  const ref = useRef<EditorRef>(null);

  const onDataChange = useCallback((data: string) => {
    localStorage.setItem('milkdown/value', data);
  }, []);

  const markdownValue = useMemo(
    () => localStorage.getItem('milkdown/value') ?? data,
    []
  );

  return (
    <ErrorBoundary>
      <section>
        <h2>Text will be there:</h2>
        <div>{text}</div>
      </section>
      <AppContainerStyled>
        <div>
          <button onClick={() => ref.current?.reset()}>Reset state</button>
          <button onClick={() => setText(ref.current?.getValue() || '')}>
            Retrieve Editor's text
          </button>
        </div>
        <TextEditor
          data={markdownValue}
          {...{ onDataChange }}
          mode="active"
          editorRef={ref}
          debounceChange={1000}
        />
      </AppContainerStyled>
    </ErrorBoundary>
  );
};

const AppContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${pxToRem(100)};
  max-width: 100vw;
  min-height: 100vh;
  margin: 0;
  background-color: #fff;

  * {
    box-sizing: border-box;
  }
`;
