import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ICourse, Response } from 'src/@types';
import { UseForm } from 'src/@types/use-form';
import * as Yup from 'yup';
import { useCourse } from '../request';

export const useCourseForm = (
  options?: UseForm<ICourse, Response<ICourse>>,
  initValue?: ICourse,
  isEdit?: boolean,
) => {
  const { createCourse, updateCourse } = useCourse();
  const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    contentLink: Yup.string().required('Link is required'),
    imageUrl: Yup.mixed().test(
      'required',
      'Photo is required',
      (value) => value,
    ),
  });

  const defaultValues = useMemo<Partial<ICourse>>(() => ({}), []);

  const methods = useForm<ICourse>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: isEdit ? initValue : defaultValues,
  });

  const onSubmit = async (input: ICourse) => {
    let course = null;
    try {
      if (isEdit && initValue) {
        course = await updateCourse(input);
      } else {
        course = await createCourse(input);
      }
      options?.onSuccess?.(input, course);
    } catch (error) {
      options?.onError?.(error.message);
    }
  };

  return {
    ...methods,
    onSubmit: methods.handleSubmit(onSubmit),
  };
};
