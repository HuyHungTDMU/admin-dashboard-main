// @types
import { useCallback } from 'react';
import { IUserAccount, Response } from 'src/@types';
import axios from 'src/utils/axios';

export const useProfile = () => {
  const updateProfile = useCallback(
    async (input: IUserAccount): Promise<Response<IUserAccount>> => {
      const formData = new FormData();
      formData.append('title', input.title);
      formData.append('name', input.name);
      if (typeof input.imageUrl !== 'string') {
        formData.append('image', input.imageUrl);
      }
      const { data } = await axios.patch('/admins', formData);

      return data;
    },
    [],
  );

  return {
    updateProfile,
  };
};
