import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ILesson, Response } from 'src/@types';
import { UseForm } from 'src/@types/use-form';
import * as Yup from 'yup';
import { useLesson } from '../request';

export const useLessonForm = (
  options?: UseForm<ILesson, Response<ILesson>>,
  initValue?: ILesson,
  isEdit?: boolean,
) => {
  const { createLesson, updateLesson } = useLesson();

  const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    imageUrl: Yup.mixed().test(
      'required',
      'Avatar is required',
      (value) => value,
    ),
  });

  const defaultValues = useMemo<Partial<ILesson>>(() => ({}), []);

  const methods = useForm<ILesson>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: isEdit ? initValue : defaultValues,
  });

  const onSubmit = async (input: ILesson) => {
    let user = null;
    try {
      if (isEdit && initValue) {
        user = await updateLesson(input);
      } else {
        user = await createLesson(input);
      }
      options?.onSuccess?.(input, user);
    } catch (error) {
      options?.onError?.(
        error?.response?.data || {
          message: error.msessage,
        },
      );
    }
  };

  return {
    ...methods,
    onSubmit: methods.handleSubmit(onSubmit),
  };
};
