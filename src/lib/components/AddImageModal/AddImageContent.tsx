import { AnimatePresence, motion } from 'framer-motion';
import { useWatch } from 'react-hook-form';
import styled from 'styled-components';

import { useFileConvertion } from './hooks/useFileConvertion';
import { ImageFormValues, useImageForm } from './hooks/useImageForm';
import { DragDropInputFile } from '../../common/DragDropInputFile';
import { Input } from '../../common/Input';
import { Loader } from '../../common/Loader';
import { useModalContext } from '../../common/Modal/context/useModalContext';
import { ModalActions } from '../../common/Modal/ModalActions';
import { ModalBody } from '../../common/Modal/ModalBody';
import {
  toggleInOut,
  toggleOutInVariant,
} from '../../styles/common/animations';
import { pxToRem } from '../../styles/utils';

export type AddImageContentProps = {
  onInsert: (source: string) => void;
};

export const AddImageContent: React.FC<AddImageContentProps> = ({
  onInsert,
}) => {
  const { onClose } = useModalContext();
  const { onFileConvert, loading } = useFileConvertion();

  const { formState, register, handleSubmit, control } = useImageForm();
  const url = useWatch<ImageFormValues>({ control, name: 'url' });

  const onFileInsert = (source: string) => {
    onInsert(source);
    onClose();
  };

  const onFileUpload = async (files: FileList) => {
    const file = await onFileConvert(files);
    if (file) {
      onFileInsert(file);
    }
  };

  const onSubmit = (data: ImageFormValues) => {
    onFileInsert(data.url as string);
  };

  if (loading) {
    return (
      <LoaderContainerStyled>
        <LoaderStyled {...{ loading }} size="large" />
        <span>Uploading image...</span>
      </LoaderContainerStyled>
    );
  }

  return (
    <ModalBody>
      <ImageContentContainerStyled>
        <motion.div
          animate={url ? 'hidden' : 'show'}
          variants={toggleOutInVariant}
        >
          <GapTextStyled>
            <DragDropInputFile
              name="insert_image"
              multiple={false}
              {...{ onFileUpload }}
            />
            <GapStyled>
              <GapTextStyled>Or</GapTextStyled>
            </GapStyled>
          </GapTextStyled>
        </motion.div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <UrlInputStyled
            {...register('url')}
            label="Import from URL"
            error={formState.errors.url?.message}
            accept="*"
            placeholder="Paste a URL of image..."
          />
          <AnimatePresence>
            {url && (
              <motion.div {...toggleInOut}>
                <ModalActionsStyled
                  loading={formState.isValidating}
                  isDisabled={formState.isValidating || !formState.isValid}
                  saveText="Insert image"
                  withCancel={false}
                  saveButtonType="submit"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </ImageContentContainerStyled>
    </ModalBody>
  );
};

const LoaderContainerStyled = styled(ModalBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${pxToRem(40)};
  padding-bottom: ${pxToRem(40)};
  min-height: ${pxToRem(350)};
  font-weight: 500;
  font-size: ${pxToRem(21)};
`;

const LoaderStyled = styled(Loader)`
  flex: 1;
`;

const ImageContentContainerStyled = styled.div`
  overflow: hidden;
  padding-top: ${pxToRem(40)};
  padding-bottom: ${pxToRem(24)};
`;

const UrlInputStyled = styled(Input)`
  margin-bottom: 0;
`;

const GapStyled = styled.div`
  display: flex;
  align-items: center;
  padding-top: ${pxToRem(32)};
  padding-bottom: ${pxToRem(24)};

  &::before,
  &::after {
    display: block;
    flex: 1;
    height: ${pxToRem(1)};
    background-color: ${props => props.theme.colors.lightGrey};
    content: '';
  }
`;

const GapTextStyled = styled.span`
  color: ${props => props.theme.colors.grey};
  padding: ${pxToRem(0)} ${pxToRem(8)};
`;

const ModalActionsStyled = styled(ModalActions)`
  padding-top: ${pxToRem(24)};
`;
