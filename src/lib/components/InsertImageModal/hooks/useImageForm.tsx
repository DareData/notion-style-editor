import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string, InferType } from 'yup';

import { isImage } from '../../../utils/utils';

const schema = object()
  .shape({
    url: string().test(
      'isImage',
      () => `We can't find or access the image in the URL`,
      async value => (value ? await isImage(value) : true)
    ),
  })
  .required();

export type ImageFormValues = InferType<typeof schema>;

export const useImageForm = () =>
  useForm<ImageFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
