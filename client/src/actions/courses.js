import * as courseApi from "../api/course";
import {
  CREATE_COURSE,
  FILTER_COURSES,
  GET_COURSE_DATA,
  GET_COURSE,
  ADD_RATING,
  ADD_REVIEW,
} from "../constants/courses";

export const getCourses = () => async (dsipatch) => {
  try {
    const { data } = await courseApi.fetchCourses();
    dsipatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const filterCourses = (filterData) => async (dispatch) => {
  try {
    const { data } = await courseApi.filterCourses(filterData);
    dispatch({ type: "FILTER_SUBJECT_RATING", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const filterByTilteOrSubjectOrInstructor =
  (searchQuery) => async (dispatch) => {
    try {
      console.log("SEARCHQUEYR", searchQuery);
      const { data } = await courseApi.filterByTilteOrSubjectOrInstructor(
        searchQuery
      );
      dispatch({ type: FILTER_COURSES, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const createCourse = (course) => async (dispatch) => {
  try {
    console.log("THE COURSE IS : ", course);
    const { data } = await courseApi.createCourse(course);
    dispatch({ type: CREATE_COURSE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getCourseData = () => async (dispatch) => {
  try {
    console.log("im in action");
    const { data } = await courseApi.getCourseData();
    dispatch({ type: GET_COURSE_DATA, payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const getCourse =
  (courseId, history, courseTitle) => async (dispatch) => {
    try {
      console.log("COURSE ID ", courseId);
      const { data } = await courseApi.getCourse(courseId);
      console.log("THE COURSE IS ", data);
      dispatch({ type: GET_COURSE, payload: data });
      history.push(`/course/${courseTitle}`);
    } catch (error) {
      console.log(error);
    }
  };
//add rating for course by trainee
export const addRating =
  (courseId, corporateTraineeId, individualTraineeId, rating) =>
  async (dispatch) => {
    try {
      console.log("Im in actions add Rating");
      const { data } = await courseApi.addRating(
        courseId,
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
  (courseId, corporateTraineeId, individualTraineeId, review) =>
  async (dispatch) => {
    try {
      const { data } = await courseApi.addReview(
        courseId,
        corporateTraineeId,
        individualTraineeId,
        review
      );
      dispatch({ type: ADD_REVIEW, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
