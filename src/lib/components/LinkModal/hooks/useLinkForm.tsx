import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string, InferType } from 'yup';

const schema = object()
  .shape({
    href: string().required('This value is required'),
    text: string(),
  })
  .required();

export type LinkFormValues = InferType<typeof schema>;

type UseLinkFormProps = {
  text: string;
  href: string;
};

export const useLinkForm = ({ text, href }: UseLinkFormProps) =>
  useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { href, text },
  });
