import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string, InferType } from 'yup';

import { useImageFromUrl } from './useImageFromUrl';
import { errorMessages } from '../../../config/errorMessages';

const schema = ({
  isImage,
  validateFormat,
}: ReturnType<typeof useImageFromUrl>) =>
  object()
    .shape({
      url: string()
        .test(
          'isImage',
          () => errorMessages.image.not_image,
          async value => (value ? await isImage(value) : true)
        )
        .test(
          'validateFormat',
          () => errorMessages.image.format,
          value => (value ? validateFormat(value) : true)
        ),
    })
    .required();

export type ImageFormValues = InferType<ReturnType<typeof schema>>;

export const useImageForm = () => {
  const imageResolvers = useImageFromUrl();

  return useForm<ImageFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(schema(imageResolvers)),
  });
};
