import { useForm } from 'react-hook-form';
import { InferType, object, string } from 'yup';

const schema = object().shape({
  alt: string(),
  title: string(),
});

export type ImageEditorFormValues = InferType<typeof schema>;

type UseImageEditorFormProps = {
  alt: string;
  title: string;
};

export const useImageEditorForm = ({ alt, title }: UseImageEditorFormProps) =>
  useForm<ImageEditorFormValues>({
    mode: 'onChange',
    defaultValues: { alt, title },
  });
