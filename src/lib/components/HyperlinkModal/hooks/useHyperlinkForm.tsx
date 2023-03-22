import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string, InferType } from 'yup';

const schema = object()
  .shape({
    href: string().required('This value is required'),
    text: string().required('This value is required'),
    title: string(),
  })
  .required();

export type HyperlinkFormValues = InferType<typeof schema>;

type UseHyperlinkFormProps = {
  text: string;
  href: string;
  title: string;
};

export const useHyperlinkForm = ({
  text,
  href,
  title,
}: UseHyperlinkFormProps) => {
  return useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { href, title, text },
  });
};
