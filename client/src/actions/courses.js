import * as courseApi from "../api/course";
import {
  CREATE_COURSE,
  FILTER_COURSES,
  GET_COURSE_DATA,
  GET_COURSE,
  ADD_RATING,
  ADD_REVIEW,
  START_LOADING,
  END_LOADING,
  FILTER_SUBJECT_RATING,
} from "../constants/courses";

export const getCourses = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await courseApi.fetchCourses();
    dispatch({ type: "FETCH_ALL", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log("GET COURSES ERROR");
    console.log("THE ERORR IS ", error);
  }
};
export const filterCourses = (filterData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await courseApi.filterCourses(filterData);
    dispatch({ type: FILTER_SUBJECT_RATING, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log("THE ERORR IS ", error);
  }
};

export const filterByTilteOrSubjectOrInstructor =
  (searchQuery) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });

      const { data } = await courseApi.filterByTilteOrSubjectOrInstructor(
        searchQuery
      );
      dispatch({ type: FILTER_COURSES, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log("THE ERORR IS ", error);
    }
  };

export const createCourse = (course) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await courseApi.createCourse(course);
    dispatch({ type: CREATE_COURSE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log("THE ERORR IS ", error);
  }
};

export const getCourseData = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await courseApi.getCourseData();
    dispatch({ type: GET_COURSE_DATA, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};
export const getCourse =
  (courseId, history, courseTitle) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await courseApi.getCourse(courseId);
      dispatch({ type: GET_COURSE, payload: data });
      dispatch({ type: END_LOADING });
      if (!courseTitle) {
        history.push(`/course/`);
      } else history.push(`/course/${courseTitle}`);
    } catch (error) {
      console.log("THE ERORR IS ", error);
    }
  };
//add rating for course by trainee
export const addRating =
  (courseId, corporateTraineeId, individualTraineeId, rating) =>
  async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });

      console.log("Im in actions add Rating");
      const { data } = await courseApi.addRating(
        courseId,
        corporateTraineeId,
        individualTraineeId,
        rating
      );
      dispatch({ type: ADD_RATING, payload: data });
      console.log(data);
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log("THE ERORR IS ", error);
    }
  };
// add review for course by trainee
export const addReview =
  (courseId, corporateTraineeId, individualTraineeId, review) =>
  async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });

      const { data } = await courseApi.addReview(
        courseId,
        corporateTraineeId,
        individualTraineeId,
        review
      );
      dispatch({ type: ADD_REVIEW, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log("THE ERORR IS ", error);
    }
  };
