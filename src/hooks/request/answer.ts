// @types
import { useCallback } from 'react';
import { IAnswer, Response } from 'src/@types';
import axios from 'src/utils/axios';

export const useAnswer = () => {
  const getAnswer = useCallback(async (id: string): Promise<IAnswer> => {
    const { data } = await axios.get(`/admins/answers/${id}`);

    return data;
  }, []);

  const createAnswer = useCallback(
    async (input: IAnswer): Promise<Response<IAnswer>> => {
      const formData = new FormData();
      formData.append('content', input.content);
      formData.append('type', input.type);
      formData.append('questionId', input.questionId);
      formData.append(
        'correctAnswerOrder',
        input.correctAnswerOrder.toString(),
      );
      formData.append('isCorrect', input.isCorrect ? 'true' : 'false');

      const { data } = await axios.post('/learnandearn/answers', formData);

      return data;
    },
    [],
  );

  const updateAnswer = useCallback(
    async (input: IAnswer): Promise<Response<IAnswer>> => {
      const formData = new FormData();
      formData.append('content', input.content);
      formData.append('type', input.type);
      // formData.append("questionId", input.questionId);
      formData.append(
        'correctAnswerOrder',
        input.correctAnswerOrder.toString(),
      );
      formData.append('isCorrect', input.isCorrect ? 'true' : 'false');
      const { data } = await axios.put(
        `/learnandearn/answers/${input.id}`,
        formData,
      );

      return data;
    },
    [],
  );

  const deleteAnswer = useCallback(
    async (id: string): Promise<Response<void>> => {
      const { data } = await axios.delete(`/learnandearn/answers/${id}`);

      return data;
    },
    [],
  );

  return {
    getAnswer,
    createAnswer,
    updateAnswer,
    deleteAnswer,
  };
};
