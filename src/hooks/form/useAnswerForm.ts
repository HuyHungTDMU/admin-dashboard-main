import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { IAnswer, Response } from 'src/@types';
import { UseForm } from 'src/@types/use-form';
import * as Yup from 'yup';
import { useAnswer } from '../request';

export const useAnswerForm = (
  options?: UseForm<IAnswer, Response<IAnswer>>,
  initValue?: IAnswer,
  isEdit?: boolean,
) => {
  const { createAnswer, updateAnswer } = useAnswer();

  const schema = Yup.object().shape({
    content: Yup.string().required('Content is required'),
    type: Yup.string().required('Type is required'),
    correctAnswerOrder: Yup.string().required(
      'Correct answer order is required',
    ),
  });

  const defaultValues = useMemo<Partial<IAnswer>>(() => ({}), []);

  const methods = useForm<IAnswer>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: isEdit ? initValue : defaultValues,
  });

  const onSubmit = async (input: IAnswer) => {
    let user = null;
    try {
      if (isEdit && initValue) {
        user = await updateAnswer(input);
      } else {
        user = await createAnswer(input);
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
