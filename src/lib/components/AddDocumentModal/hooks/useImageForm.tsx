import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string, InferType } from 'yup';

const schema = object()
  .shape({
    url: string().required(),
  })
  .required();

export type ImageFormValues = InferType<typeof schema>;

export const useImageForm = () => {
  return useForm<ImageFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
};
