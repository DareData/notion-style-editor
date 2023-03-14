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

  .code-block {
    margin: ${pxToRem(16)} 0;
    padding: ${pxToRem(16)};
    font-size: ${pxToRem(16)};
    line-height: ${pxToRem(22)};
    background-color: ${props => props.theme.colors.lightAzure};
    border: 1px solid ${props => props.theme.colors.azure};
    border-radius: ${pxToRem(8)};
    * {
      font-family: ${props => props.theme.fonts.secondary};
    }
    .code-block_actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: ${pxToRem(16)};
      .copy-button_text {
        margin-left: ${pxToRem(5)};
      }
    }
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
      .table-selector-widget {
        position: absolute;
        padding: 0;
        background-color: ${props => props.theme.colors.secondaryGrey};
        border-radius: ${pxToRem(1)};
        &.drag-over {
          border: 1px solid ${props => props.theme.colors.green};
        }
        &.widget-row {
          top: ${pxToRem(1)};
          bottom: ${pxToRem(1)};
          left: ${pxToRem(-10)};
          width: ${pxToRem(4)};
        }
        &.widget-column {
          top: ${pxToRem(-10)};
          right: ${pxToRem(1)};
          left: ${pxToRem(1)};
          height: ${pxToRem(4)};
        }
        &.widget-table {
          top: ${pxToRem(-12)};
          left: ${pxToRem(-12)};
          width: ${pxToRem(8)};
          height: ${pxToRem(8)};
          border-radius: 50%;
          opacity: 0.5;
        }
      }
    }
  }

  .table-tooltip {
    display: flex;
    gap: ${pxToRem(20)};
    align-items: center;
    padding: ${pxToRem(6)} ${pxToRem(15)};
    background-color: ${props => props.theme.colors.white};
    border: ${pxToRem(1)} solid ${props => props.theme.colors.lightGrey};
    border-radius: ${pxToRem(8)};
  }
`;
