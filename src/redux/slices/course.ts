import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { ICourse, ICourseState } from '../../@types/course';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState: ICourseState = {
  isLoading: false,
  error: null,
  courses: [],
  course: null,
};

const slice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET COURSES
    getCoursesSuccess(state, action) {
      state.isLoading = false;
      state.courses = action.payload;
    },

    // GET COURSE
    getCourseSuccess(state, action) {
      state.isLoading = false;
      state.course = action.payload;
    },

    // CREATE COURSE
    createCourseSuccess(state, action) {
      const newCourse = action.payload;
      state.isLoading = false;
      state.courses = [...state.courses, newCourse];
    },

    // UPDATE COURSE
    uopdateCourseSuccess(state, action) {
      const newCourse = action.payload;
      state.isLoading = false;
      state.courses[newCourse.id] = newCourse;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCourses() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/admins/courses');
      dispatch(slice.actions.getCoursesSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getCourse(id: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/learnandearn/courses', {
        params: { id },
      });
      dispatch(slice.actions.getCourseSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createCourse(newCourse: ICourse) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/kanban/columns/new', newCourse);
      dispatch(slice.actions.createCourseSuccess(response.data.column));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
