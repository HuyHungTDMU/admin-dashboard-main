import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { IQuestion, Response } from 'src/@types';
import { UseForm } from 'src/@types/use-form';
import * as Yup from 'yup';
import { useQuestion } from '../request';

export const useQuestionForm = (
  options?: UseForm<IQuestion, Response<IQuestion>>,
  initValue?: IQuestion,
  isEdit?: boolean,
) => {
  const { createQuestion, updateQuestion } = useQuestion();

  const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    type: Yup.string().required('Type is required'),
    rewardValue: Yup.string().required('Reward value is required'),
    rewardAsset: Yup.string().required('Reward asset is required'),
    choiceAmount: Yup.string().required('Choice amount is required'),
  });

  const defaultValues = useMemo<Partial<IQuestion>>(() => ({}), []);

  const methods = useForm<IQuestion>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: isEdit ? initValue : defaultValues,
  });

  const onSubmit = async (input: IQuestion) => {
    let res = null;
    try {
      if (isEdit && initValue) {
        res = await updateQuestion(input);
      } else {
        res = await createQuestion(input);
      }
      options?.onSuccess?.(input, res);
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
