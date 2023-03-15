import { AnimatePresence, motion } from 'framer-motion';
import { useWatch } from 'react-hook-form';
import styled from 'styled-components';

import { ImageFormValues, useImageForm } from './hooks/useImageForm';
import { DragDropInputFile } from '../../common/DragDropInputFile';
import { Input } from '../../common/Input';
import { useModalContext } from '../../common/Modal/context/useModalContext';
import { ModalActions } from '../../common/Modal/ModalActions';
import { ModalBody } from '../../common/Modal/ModalBody';
import { ModalFooter } from '../../common/Modal/ModalFooter';
import {
  toggleInOut,
  toggleOutInVariant,
} from '../../styles/common/animations';
import { pxToRem } from '../../styles/utils';

export type InsertImageContentProps = {
  onInsert: (source: string) => void;
};

export const InsertImageContent: React.FC<InsertImageContentProps> = ({
  onInsert,
}) => {
  const { onClose } = useModalContext();

  const { formState, register, handleSubmit, control } = useImageForm();
  const url = useWatch<ImageFormValues>({ control, name: 'url' });

  const onFileInsert = (source: string) => {
    onInsert(source);
    onClose();
  };

  const onSubmit = (data: ImageFormValues) => {
    onFileInsert(data.url as string);
  };

  return (
    <ImageContentContainerStyled>
      <motion.div
        animate={url ? 'hidden' : 'show'}
        variants={toggleOutInVariant}
      >
        <>
          <DragDropInputFileStyled
            name="insert_image"
            onFileChange={onFileInsert}
          />
          <GapStyled>
            <GapTextStyled>Or</GapTextStyled>
          </GapStyled>
        </>
      </motion.div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBodyStyled>
          <UrlInputStyled
            {...register('url')}
            label="Import from URL"
            placeholder="Paste a URL of image..."
            error={formState.errors.url?.message}
          />
        </ModalBodyStyled>
        <AnimatePresence>
          {url && (
            <motion.div {...toggleInOut}>
              <ModalFooterStyled>
                <ModalActions
                  loading={formState.isValidating}
                  isDisabled={formState.isValidating || !formState.isValid}
                  saveText="Insert image"
                  withCancel={false}
                  saveButtonType="submit"
                />
              </ModalFooterStyled>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </ImageContentContainerStyled>
  );
};

const ImageContentContainerStyled = styled.div`
  overflow: hidden;
`;

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
  padding: ${pxToRem(20)} ${pxToRem(24)} ${pxToRem(12)};
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

const DragDropInputFileStyled = styled(DragDropInputFile)`
  padding: ${pxToRem(40)} ${pxToRem(24)} ${pxToRem(12)};
`;
