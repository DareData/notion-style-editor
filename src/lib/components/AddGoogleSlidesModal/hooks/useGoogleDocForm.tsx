import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string, InferType } from 'yup';

import { useGoogleDocValidation } from './useGoogleDocValidation';
import { errorMessages } from '../../../config/errorMessages';

const schema = ({
  validateGoogleSlides,
}: ReturnType<typeof useGoogleDocValidation>) =>
  object()
    .shape({
      url: string()
        .required('This field is required')
        .test(
          'validateGoogleSlides',
          () => errorMessages.image.google_slides,
          value => (value ? validateGoogleSlides(value) : true)
        ),
    })
    .required();

export type GoogleDocFormValues = InferType<ReturnType<typeof schema>>;

export const useGoogleDocForm = () => {
  const googleDocResolvers = useGoogleDocValidation();

  return useForm<GoogleDocFormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema(googleDocResolvers)),
  });
};
