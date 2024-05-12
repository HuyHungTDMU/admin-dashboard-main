// @types
import { useCallback } from 'react';
import { IQuestion, Response } from 'src/@types';
import axios from 'src/utils/axios';

export const useQuestion = () => {
  const getQuestion = useCallback(async (id: string): Promise<IQuestion> => {
    const { data } = await axios.get(`/admins/questions/${id}`);

    return data;
  }, []);

  const createQuestion = useCallback(
    async (input: IQuestion): Promise<Response<IQuestion>> => {
      const formData = new FormData();
      formData.append('title', input.title);
      formData.append('image', input.imageUrl);
      formData.append('courseId', input.courseId);
      formData.append('content', input.content);
      formData.append('type', input.type);
      formData.append('choiceAmount', input.choiceAmount?.toString());
      formData.append('description', input.description);
      formData.append('rewardValue', input.rewardValue?.toString());
      formData.append('rewardAsset', input.rewardAsset);

      const { data } = await axios.post('/learnandearn/questions', formData);

      return data;
    },
    [],
  );

  const updateQuestion = useCallback(
    async (input: IQuestion): Promise<Response<IQuestion>> => {
      const formData = new FormData();
      formData.append('title', input.title);
      if (typeof input.imageUrl !== 'string') {
        formData.append('image', input.imageUrl);
      }
      formData.append('content', input.content);
      formData.append('type', input.type);
      formData.append('choiceAmount', input.choiceAmount?.toString());
      formData.append('description', input.description);
      formData.append('rewardValue', input.rewardValue?.toString());
      formData.append('rewardAsset', input.rewardAsset);

      const { data } = await axios.put(
        `/learnandearn/questions/${input.id}`,
        formData,
      );

      return data;
    },
    [],
  );

  const deleteQuestion = useCallback(
    async (id: string): Promise<Response<void>> => {
      const { data } = await axios.delete(`/learnandearn/questions/${id}`);

      return data;
    },
    [],
  );

  return {
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion,
  };
};
