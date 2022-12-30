<<<<<<< HEAD
import {
  FETCH_ALL,
  FETCH_INSTRUCTORS,
  ADD_INSTRUCTOR,
} from "../constants/instructors";
=======
import { FETCH_INSTRUCTORS, ADD_INSTRUCTOR, FETCH_INSTRUCTOR } from "../constants/instructors";
import { UPDATE_INSTRUCTOR } from "../constants/auth";
>>>>>>> 290139e5c6675d5075a1ed46c82a0c61cd37a99c
import * as instructorApi from "../api/instructor";
import * as adminApi from "../api/admin";

export const getInstructors = () => async (dispatch) => {
  try {
    const { data } = await instructorApi.fetchInstructors();
    dispatch({ type: FETCH_INSTRUCTORS, payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const getInstructor = () => async (dispatch) => {
  try {
    const { data } = await instructorApi.fetchInstructor();
    dispatch({ type: FETCH_INSTRUCTOR, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const getAllInstructorCourses = () => async (dispatch) => {
  try {
    const { data } = await instructorApi.getAllInstructorCourses();
    dispatch({ type: "FETCH_ALL_INSTRUCTOR_COURSES", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const filterInstructorCourses = (filterData) => async (dispatch) => {
  try {
    const { data } = await instructorApi.filterInstructorCourses(filterData);
    dispatch({ type: "FILTER_INSTRUCTOR_COURSES", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addInstructor = (instructor) => async (dispatch) => {
  try {
<<<<<<< HEAD
    const res = await instructorApi.addInstructor(instructor);
    console.log(res.data);
=======

    const res = await adminApi.addInstructor(instructor);
>>>>>>> 290139e5c6675d5075a1ed46c82a0c61cd37a99c
    if (res.status === 200)
      dispatch({ type: ADD_INSTRUCTOR, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const updateInstructor = (id, instructor) => async (dispatch) => {
  try {
    const { data } = await instructorApi.updateInstructor(id, instructor);
    dispatch({ type: UPDATE_INSTRUCTOR, payload: data });
  } catch (error) {
    console.log(error);
  }
};
