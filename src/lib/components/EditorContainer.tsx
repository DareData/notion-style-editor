import styled from 'styled-components';

import { pxToRem } from '../styles/utils';

export const EditorContainer = styled.div`
  padding: ${pxToRem(20)} ${pxToRem(12)};
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${pxToRem(6)};
  transition: border-color 0.2s ease-in;

  &:hover,
  &:focus {
    border-color: ${props => props.theme.colors.grey};
  }

  .ProseMirror-focused {
    outline: 0;
    border-color: ${props => props.theme.colors.lightBlack};
  }

  blockquote {
    margin: ${pxToRem(16)} 0;
    padding-left: ${pxToRem(20)};
    border-left: 4px solid ${props => props.theme.colors.green};
  }

  ul,
  ol {
    padding-left: ${pxToRem(20)};
  }

  li {
    padding-left: ${pxToRem(2)};
  }

  p {
    margin: ${pxToRem(16)} 0;
  }
  .tableWrapper {
    table {
      width: calc(100% - 12px);
      margin-top: ${pxToRem(12)};
      margin-left: ${pxToRem(12)};
      overflow: visible;
      font-size: ${pxToRem(14)};
      border-collapse: collapse;
      th {
        position: relative;
        background-color: ${props => props.theme.colors.secondaryLightGrey};
        border-color: ${props => props.theme.colors.white};
      }
      th,
      td {
        padding: ${pxToRem(16)};
        border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
        &:not(:first-of-type) {
          border-left: 1px solid ${props => props.theme.colors.white};
        }
        &:not(:last-of-type) {
          border-right: 1px solid ${props => props.theme.colors.white};
        }
        &.selectedCell {
          background-color: ${props => props.theme.colors.azure};
        }
      }
    }
  }
`;
