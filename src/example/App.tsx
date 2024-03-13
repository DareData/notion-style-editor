/* eslint-disable no-useless-escape */
import { useRef, useState } from 'react';
import styled from 'styled-components';

import { MentionsListDropdown } from './MentionsListDropdown';
import { ErrorBoundary } from '../ErrorBoundary';
import { EditorRef } from '../lib/packages/Editor';
import { TextEditor } from '../lib/packages/TextEditor';
import { pxToRem } from '../lib/styles/utils';

const data = localStorage.getItem('editor_state') || '';

export const App = () => {
  const [text, setText] = useState('');
  const ref = useRef<EditorRef>(null);

  return (
    <ErrorBoundary>
      <section>
        <h2>Text will be there:</h2>
        <div data-testid="editor-retrieved-value">{text}</div>
      </section>
      <AppContainerStyled>
        <div>
          <button onClick={() => ref.current?.reset()}>Reset state</button>
          <button onClick={() => setText(ref.current?.getValue() || '')}>
            Retrieve Editor's text
          </button>
        </div>
        <TextEditor
          mode="active"
          data={data}
          editorRef={ref}
          placeholder="Type here"
          debounceChange={0}
          components={{
            MentionsListDropdown,
          }}
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
