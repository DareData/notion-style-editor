import { useForm } from 'react-hook-form';
import { InferType, object, string } from 'yup';

const schema = object().shape({
  alt: string(),
  title: string(),
});

export type EditImageFormValues = InferType<typeof schema>;

type UseEditImageFormProps = {
  alt: string;
  title: string;
};

export const useEditImageForm = ({ alt, title }: UseEditImageFormProps) =>
  useForm<EditImageFormValues>({
    mode: 'onChange',
    defaultValues: { alt, title },
  });
