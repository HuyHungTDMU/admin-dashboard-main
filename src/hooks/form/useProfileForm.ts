import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { IUserAccount, Response } from 'src/@types';
import { UseForm } from 'src/@types/use-form';
import * as Yup from 'yup';
import { useProfile } from '../request';

export const useProfileForm = (
  options?: UseForm<IUserAccount, Response<IUserAccount>>,
  initValue?: IUserAccount,
) => {
  const { updateProfile } = useProfile();

  const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    name: Yup.string().required('Name is required'),
    imageUrl: Yup.mixed().test(
      'required',
      'Photo is required',
      (value) => value,
    ),
  });

  const methods = useForm<IUserAccount>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: initValue,
  });

  const onSubmit = async (input: IUserAccount) => {
    let profile = null;
    try {
      profile = await updateProfile(input);
      options?.onSuccess?.(input, profile);
    } catch (error) {
      options?.onError?.(error.message);
    }
  };

  return {
    ...methods,
    onSubmit: methods.handleSubmit(onSubmit),
  };
};
