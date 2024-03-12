/* eslint-disable no-useless-escape */
import { useRef, useState } from 'react';
import styled from 'styled-components';

import { ErrorBoundary } from '../ErrorBoundary';
import { EditorRef } from '../lib/packages/Editor';
import { TextEditor, TextEditorProps } from '../lib/packages/TextEditor';
import { pxToRem } from '../lib/styles/utils';

const data = localStorage.getItem('editor_state') || '';

const names = [
  'John',
  'Emma',
  'Michael',
  'Sophia',
  'William',
  'Olivia',
  'James',
  'Ava',
  'Alexander',
  'Isabella',
  'Daniel',
  'Mia',
  'Matthew',
  'Krzysztof',
  'Charlotte',
  'David',
  'Amelia',
  'Joseph',
  'Emily',
  'Jackson',
  'Addison',
];

type MentionsListDropdownProps =
  Required<TextEditorProps>['components']['MentionsListDropdown'];

export const MentionsListDropdown: MentionsListDropdownProps = ({
  queryText,
  onMentionItemClick,
}) => {
  const options = names.filter(name => name.includes(queryText));
  if (!options.length) {
    return (
      <div
        style={{
          padding: '5px',
          background: 'red',
        }}
      >
        Found nothing
      </div>
    );
  }
  return (
    <ul
      style={{
        minWidth: '100px',
        padding: '5px',
        marginTop: 0,
        background: 'red',
        listStyleType: 'none',
      }}
    >
      {options.map(option => (
        <li key={option}>
          <button
            style={{ padding: '4px' }}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onMentionItemClick(option, 'https://facebook/user/' + option);
            }}
          >
            {option}
          </button>
        </li>
      ))}
    </ul>
  );
};
