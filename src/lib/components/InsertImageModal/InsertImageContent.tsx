import { useWatch } from 'react-hook-form';
import styled from 'styled-components';

import { ImageFormValues, useImageForm } from './hooks/useImageForm';
import { Input } from '../../common/Input';
import { ModalActions } from '../../common/Modal/ModalActions';
import { ModalBody } from '../../common/Modal/ModalBody';
import { ModalFooter } from '../../common/Modal/ModalFooter';
import { pxToRem } from '../../styles/utils';

export const InsertImageContent: React.FC = () => {
  const { formState, register, watch, handleSubmit, control } = useImageForm();
  const url = useWatch<ImageFormValues>({ control, name: 'url' });

  const onSubmit = (data: ImageFormValues) => {};

  return (
    <>
      {!url && (
        <>
          <ModalBodyStyled>Drag and drop</ModalBodyStyled>
          <GapStyled>
            <GapTextStyled>Or</GapTextStyled>
          </GapStyled>
        </>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBodyStyled>
          <UrlInputStyled
            {...register('url')}
            label="Import from URL"
            placeholder="Paste a URL of image..."
          />
        </ModalBodyStyled>
        {url && (
          <ModalFooterStyled>
            <ModalActions
              saveText="Insert image"
              withCancel={false}
              saveButtonType="submit"
            />
          </ModalFooterStyled>
        )}
      </form>
    </>
  );
};

const UrlInputStyled = styled(Input)`
  margin-bottom: 0;
`;

const ModalBodyStyled = styled(ModalBody)`
  padding-top: ${pxToRem(24)};
  padding-bottom: ${pxToRem(24)};
`;

const ModalFooterStyled = styled(ModalFooter)`
  padding-top: 0;
`;

const GapStyled = styled.div`
  display: flex;
  align-items: center;
  padding: ${pxToRem(32)} ${pxToRem(24)} ${pxToRem(12)};
  &::before,
  &:after {
    content: '';
    flex: 1;
    display: block;
    height: ${pxToRem(1)};
    background-color: ${props => props.theme.colors.lightGrey};
  }
`;

const GapTextStyled = styled.span`
  color: ${props => props.theme.colors.grey};
  padding: ${pxToRem(0)} ${pxToRem(8)};
`;
