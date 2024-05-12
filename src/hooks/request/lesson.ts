// @types
import { useCallback } from 'react';
import { ILesson, Response } from 'src/@types';
import axios from 'src/utils/axios';

export const useLesson = () => {
  const getLesson = useCallback(async (id: string): Promise<ILesson> => {
    const { data } = await axios.get(`/learnandearn/lessons/${id}`);

    return data;
  }, []);

  const createLesson = useCallback(
    async (input: ILesson): Promise<Response<ILesson>> => {
      const formData = new FormData();
      formData.append('title', input.title);
      formData.append('description', input.description);
      formData.append('image', input.imageUrl);
      formData.append('courseId', input.courseId);

      const { data } = await axios.post('/learnandearn/lessons', formData);

      return data;
    },
    [],
  );

  const updateLesson = useCallback(
    async (input: ILesson): Promise<Response<ILesson>> => {
      const formData = new FormData();
      formData.append('title', input.title);
      formData.append('description', input.description);
      if (typeof input.imageUrl !== 'string') {
        formData.append('image', input.imageUrl);
      }
      const { data } = await axios.put(
        `/learnandearn/lessons/${input.id}`,
        formData,
      );

      return data;
    },
    [],
  );

  const deleteLesson = useCallback(
    async (id: string): Promise<Response<void>> => {
      const { data } = await axios.delete(`/learnandearn/lessons/${id}`);

      return data;
    },
    [],
  );

  return {
    getLesson,
    createLesson,
    updateLesson,
    deleteLesson,
  };
};
