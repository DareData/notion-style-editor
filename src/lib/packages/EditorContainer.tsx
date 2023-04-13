import styled from 'styled-components';

import { Fonts } from '../styles/fonts/Fonts';
import { pxToRem } from '../styles/utils';

export const EditorContainer = styled.div`
  width: 100%;
  padding: ${pxToRem(12)} ${pxToRem(12)} ${pxToRem(20)};
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${pxToRem(6)};
  transition: border-color 0.2s ease-in;

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: ${props => props.theme.colors.lightBlack};
    font-family: ${props => props.theme.fonts.primary};

    &::selection {
      background-color: ${props => props.theme.components.selection};
    }
  }

  &&& {
    .success-toaster div {
      color: ${props => props.theme.colors.white};
    }

    .error-toaster div {
      color: ${props => props.theme.colors.lightBlack};
    }

    .tippy-box {
      background-color: transparent;
    }

    .tippy-content {
      padding: 0;
    }
  }

  ${Fonts};

  &:hover,
  &:focus {
    border-color: ${props => props.theme.colors.grey};
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .ProseMirror-focused {
    border-color: ${props => props.theme.colors.lightBlack};
    outline: 0;
  }

  .editor {
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

    a {
      color: ${props => props.theme.components.editor.link};
      font-weight: 600;
      text-decoration: none;
    }

    .emoji {
      width: ${pxToRem(16)};
      height: ${pxToRem(16)};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: ${pxToRem(16)} 0;
      font-weight: bold;
      font-family: ${props => props.theme.fonts.figree};
    }

    h1 {
      font-size: ${pxToRem(32)};
    }

    h2 {
      font-size: ${pxToRem(24)};
    }
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .tableWrapper {
    table {
      width: calc(100% - 14px);
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

        /* stylelint-disable-next-line selector-class-pattern */
        &.selectedCell {
          background-color: ${props => props.theme.colors.azure};
        }
      }
    }
  }
`;
