import {
  FETCH_ALL,
  FETCH_INSTRUCTORS,
  ADD_INSTRUCTOR,
} from "../constants/instructors";
import * as instructorApi from "../api/instructor";

export const getInstructors = () => async (dispatch) => {
  try {
    console.log("IAM HERE");
    const { data } = await instructorApi.fetchInstructors();
    console.log(data);
    console.log("INSTRUCTOR FETCH_ALL ACTION");
    dispatch({ type: FETCH_INSTRUCTORS, payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const getInstructor = () => async (dispatch) => {
  try {
    console.log("IAM HERE");
    const { data } = await instructorApi.fetchInstructor();
    console.log(data);
    console.log("INSTRUCTOR FETCH_INSTRUCTOR ACTION");
    dispatch({ type: "FETCH_INSTRUCTOR", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const getAllInstructorCourses = () => async (dispatch) => {
  try {
    console.log("hhhhh");
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
    const res = await instructorApi.addInstructor(instructor);
    console.log(res.data);
    if (res.status === 200)
      dispatch({ type: ADD_INSTRUCTOR, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
