import { useRef } from 'react';
import styled from 'styled-components';

import { Button } from './Button';
import { Icon } from './Icon/Icon';
import { useToggler } from '../hooks/useToggler';
import { accessibleHide, pxToRem } from '../styles/utils';

type DragDropInputFileProps = React.InputHTMLAttributes<HTMLInputElement> & {};

export const DragDropInputFile: React.FC<DragDropInputFileProps> = ({
  name,
  className = '',
  ...rest
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const drag = useToggler();

  const onDragEnter = () => {
    drag.on();
  };
  const onDragLeave = () => {
    drag.off();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files);
    }
  };

  const onBrowseButtonClick = () => {
    inputFileRef.current?.click();
  };

  return (
    <div {...{ onDragEnter, onDragLeave, className }}>
      <InputFileStyled
        ref={inputFileRef}
        type="file"
        multiple
        onChange={onFileChange}
        {...{ name }}
        {...rest}
      />
      <LabelStyled htmlFor={name}>
        <Icon icon="d_a_d_file" width={230} height={230} />
        <DragAndDropStyled>
          Drag and drop or{' '}
          <BrowseButtonStyled onClick={onBrowseButtonClick} prop="as-anchor">
            browse
          </BrowseButtonStyled>
        </DragAndDropStyled>
        <FileInfoSyled>Image files, maximum file size 20 MB</FileInfoSyled>
      </LabelStyled>
    </div>
  );
};

const InputFileStyled = styled.input`
  ${accessibleHide}
`;

const LabelStyled = styled.label`
  display: flex;
  align-items: center;
  flex-direction: column;
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
`;
