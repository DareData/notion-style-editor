import { useRef } from 'react';
import styled, { css } from 'styled-components';

import { Button } from './Button';
import { Icon, IconProps } from './Icon/Icon';
import { useToggler } from '../hooks/useToggler';
import { accessibleHide, pxToRem } from '../styles/utils';

type DragDropInputFileProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onFileUpload: (file: FileList) => void;
};

export const DragDropInputFile: React.FC<DragDropInputFileProps> = ({
  name,
  className = '',
  onFileUpload,
  ...rest
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const dragActive = useToggler();

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      onFileUpload(e.target.files);
    }
  };

  const onDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      dragActive.on();
    } else if (e.type === 'dragleave') {
      dragActive.off();
    }
  };

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragActive.off();
    if (e.dataTransfer.files) {
      onFileUpload(e.dataTransfer.files);
    }
  };

  const onBrowseButtonClick = () => {
    inputFileRef.current?.click();
  };

  return (
    <DragDropFileContainerStyled {...{ className }} onDragEnter={onDrag}>
      <InputFileStyled
        ref={inputFileRef}
        type="file"
        onChange={onChange}
        {...{ name }}
        {...rest}
      />
      <LabelStyled htmlFor={name} $dragActive={dragActive.state}>
        <IconStyled
          icon="d_a_d_file"
          width={230}
          height={230}
          $dragOver={dragActive.state}
          fill="#BABABA"
        />
        <DragAndDropStyled>
          Drag and drop or
          <BrowseButtonStyled
            onClick={onBrowseButtonClick}
            variant="simple_text"
          >
            browse
          </BrowseButtonStyled>
        </DragAndDropStyled>
        <FileInfoSyled>maximum file size 20 MB</FileInfoSyled>
      </LabelStyled>
      {dragActive.state && (
        <DragElementStyled
          {...{ onDrop }}
          onDragOver={onDrag}
          onDragEnter={onDrag}
          onDragLeave={onDrag}
        />
      )}
    </DragDropFileContainerStyled>
  );
};

const DragDropFileContainerStyled = styled.div`
  position: relative;
`;

const InputFileStyled = styled.input`
  ${accessibleHide}
`;

const LabelStyled = styled.label<{ $dragActive: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: ${pxToRem(16)} 0;
  border-radius: ${pxToRem(8)};
  border: 2px solid
    ${props => (props.$dragActive ? props.theme.colors.green : 'transparent')};
  background-color: ${props =>
    props.$dragActive
      ? props.theme.colors.lightAzure
      : props.theme.colors.white};
  transition: border-color 0.2s ease-in, background-color 0.2s ease-in;
`;

const DragAndDropStyled = styled.p`
  display: flex;
  align-items: center;
  margin-top: ${pxToRem(12)};
  margin-bottom: ${pxToRem(4)};
  font-size: ${pxToRem(21)};
  gap: ${pxToRem(4)};
`;

const FileInfoSyled = styled.p`
  color: ${props => props.theme.colors.grey};
`;

const BrowseButtonStyled = styled(Button)`
  font-size: ${pxToRem(21)};
  text-decoration: underline;

  &:hover,
  &:focus {
    color: ${props => props.theme.colors.green};
  }
`;

type IconStyledProps = IconProps & { $dragOver: boolean };
const IconStyled = styled<React.FC<IconStyledProps>>(Icon)`
  .light-green,
  .green,
  .dark-green {
    transition: fill 0.2s ease-in;
  }
  ${props =>
    props.$dragOver &&
    css`
      .secondary-light-green {
        fill: ${props => props.theme.colors.azure};
      }

      .light-green {
        fill: #8dd4cb;
      }

      .green {
        fill: ${props => props.theme.colors.green};
      }
    `}
`;

const DragElementStyled = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
`;
