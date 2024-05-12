// @types
import { useCallback } from 'react';
import {
  ICourse,
  IPageOptions,
  IPaginationResponse,
  Response,
} from 'src/@types';
import { courseStatus } from 'src/sections/course/CourseTableRow';
import axios from 'src/utils/axios';

export const useCourse = () => {
  const getCourses = useCallback(
    async (
      pageOptions: IPageOptions,
    ): Promise<IPaginationResponse<ICourse> | null> => {
      const { data } = await axios.get('/admins/courses', {
        params: pageOptions,
      });

      return data;
    },
    [],
  );

  const getCourse = useCallback(async (id: string): Promise<ICourse> => {
    const { data } = await axios.get(`/admins/courses/${id}`);

    return data;
  }, []);

  const createCourse = useCallback(
    async (input: ICourse): Promise<Response<ICourse>> => {
      const formData = new FormData();
      formData.append('title', input.title);
      formData.append('contentLink', input.contentLink);
      formData.append('image', input.imageUrl);

      const { data } = await axios.post('/learnandearn/courses', formData);

      return data;
    },
    [],
  );

  const updateCourse = useCallback(
    async (input: ICourse): Promise<Response<ICourse>> => {
      const formData = new FormData();
      formData.append('courseId', input.id);
      formData.append('title', input.title);
      formData.append('contentLink', input.contentLink);
      if (typeof input.imageUrl !== 'string') {
        formData.append('image', input.imageUrl);
      }

      const { data } = await axios.post('/learnandearn/courses', formData);

      return data;
    },
    [],
  );

  const deleteCourse = useCallback(
    async (id: string): Promise<Response<void>> => {
      const { data } = await axios.delete(`/learnandearn/courses/${id}`);

      return data;
    },
    [],
  );

  const submitCourse = useCallback(
    async (id: string): Promise<Response<ICourse>> => {
      const { data } = await axios.patch(
        `/learnandearn/courses/${id}/active-status`,
        { activeStatus: courseStatus.SUBMITTED },
      );

      return data;
    },
    [],
  );

  const cancelSubmitCourse = useCallback(
    async (id: string): Promise<Response<ICourse>> => {
      const { data } = await axios.patch(
        `/learnandearn/courses/${id}/active-status`,
        { activeStatus: courseStatus.CREATING },
      );

      return data;
    },
    [],
  );

  const reportToAdmin = useCallback(
    async (id: string, message: string): Promise<Response<ICourse>> => {
      const { data } = await axios.patch(`/learnandearn/courses/${id}/report`, {
        description: message,
      });

      return data;
    },
    [],
  );

  const rejectCourse = useCallback(
    async (id: string, message: string): Promise<Response<ICourse>> => {
      const { data } = await axios.patch(
        `/learnandearn/courses/${id}/active-status`,
        {
          activeStatus: courseStatus.REJECTED,
          description: message,
        },
      );

      return data;
    },
    [],
  );

  const approveCourse = useCallback(
    async (id: string): Promise<Response<ICourse>> => {
      const { data } = await axios.patch(
        `/learnandearn/courses/${id}/active-status`,
        { activeStatus: courseStatus.PRODUCTION },
      );

      return data;
    },
    [],
  );

  const markAsRead = useCallback(async (id: string) => {
    await axios.post(`/reports/mark-as-read`, { courseId: id });
  }, []);

  return {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    submitCourse,
    cancelSubmitCourse,
    reportToAdmin,
    rejectCourse,
    approveCourse,
    markAsRead,
  };
};
