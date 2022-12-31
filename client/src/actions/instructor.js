import {
  FETCH_INSTRUCTORS,
  FETCH_INSTRUCTOR,
  ADD_INSTRUCTOR,
  ADD_RATING,
  ADD_REVIEW,
} from "../constants/instructors";
import {
  FETCH_ALL_INSTRUCTOR_COURSES,
  START_LOADING,
  END_LOADING,
} from "../constants/courses";
import { UPDATE_INSTRUCTOR } from "../constants/auth";
import * as instructorApi from "../api/instructor";
import * as adminApi from "../api/admin";

export const getInstructors = () => async (dispatch) => {
  try {
    const { data } = await instructorApi.fetchInstructors();
    dispatch({ type: FETCH_INSTRUCTORS, payload: data });
  } catch (err) {
    console.log(err);
    console.log(err);
  }
};
export const getInstructor = (id) => async (dispatch) => {
  try {
    console.log("IAM HERE");
    const { data } = await instructorApi.fetchInstructor(id);
    console.log(data);
    console.log("INSTRUCTOR FETCH_INSTRUCTOR ACTION");
    dispatch({ type: FETCH_INSTRUCTOR, payload: data });
  } catch (err) {
    console.log(err);
    console.log(err);
  }
};

export const getAllInstructorCourses = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await instructorApi.getAllInstructorCourses(id);
    dispatch({ type: FETCH_ALL_INSTRUCTOR_COURSES, payload: data });
    dispatch({ type: END_LOADING });
    console.log("I finished dispatching the action");
    console.log("I finished dispatching the action");
    console.log("I finished dispatching the action");
  } catch (error) {
    console.log("IAM IN THE ERROR??");
    console.log(error);
  }
};
export const filterInstructorCourses = (filterData) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await instructorApi.filterInstructorCourses(filterData);
    dispatch({ type: "FILTER_INSTRUCTOR_COURSES", payload: data });
    dispatch({ type: "START_LOADING" });
  } catch (error) {
    console.log(error);
  }
};

export const addInstructor = (instructor) => async (dispatch) => {
  try {
    const res = await adminApi.addInstructor(instructor);
    console.log(res.data);
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

//add rating for course by trainee
export const addRating =
  (instructorId, corporateTraineeId, individualTraineeId, rating) =>
  async (dispatch) => {
    try {
      console.log("Im in actions add Rating");
      const { data } = await instructorApi.addRating(
        instructorId,
        corporateTraineeId,
        individualTraineeId,
        rating
      );
      dispatch({ type: ADD_RATING, payload: data });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
// add review for course by trainee
export const addReview =
  (instructorId, corporateTraineeId, individualTraineeId, review) =>
  async (dispatch) => {
    try {
      const { data } = await instructorApi.addReview(
        instructorId,
        corporateTraineeId,
        individualTraineeId,
        review
      );
      dispatch({ type: ADD_REVIEW, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
