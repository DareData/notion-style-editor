import { AnimatePresence, motion } from 'framer-motion';
import { useWatch } from 'react-hook-form';
import styled from 'styled-components';

import { ImageFormValues, useImageForm } from './hooks/useImageForm';
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
  onInsert: (data: ImageFormValues) => void;
};

export const InsertImageContent: React.FC<InsertImageContentProps> = ({
  onInsert,
}) => {
  const { onClose } = useModalContext();

  const { formState, register, handleSubmit, control } = useImageForm();
  const url = useWatch<ImageFormValues>({ control, name: 'url' });

  const onSubmit = (data: ImageFormValues) => {
    onInsert(data);
    onClose();
  };

  return (
    <ImageContentContainerStyled>
      <motion.div
        animate={url ? 'hidden' : 'show'}
        variants={toggleOutInVariant}>
        <div>
          <ModalBodyStyled>Drag and drop</ModalBodyStyled>
          <GapStyled>
            <GapTextStyled>Or</GapTextStyled>
          </GapStyled>
        </div>
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
                  isDisabled={formState.isValidating}
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
