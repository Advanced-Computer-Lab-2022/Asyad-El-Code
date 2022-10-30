import * as api from "../api/index";

export const getCourses = () => async (dsipatch) => {
  try {
    const { data } = await api.fetchCourses();
    dsipatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const filterCourses = (filterData) => async (dispatch) => {
  try {
    const { data } = await api.filterCourses(filterData);
    dispatch({ type: "FILTER_SUBJECT_RATING", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getAllInstructorCourses = () => async (dispatch) => {
  try {
    const { data } = await api.getAllInstructorCourses();
    dispatch({ type: "FETCH_ALL_INSTRUCTOR_COURSES", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const filterInstructorCourses = (filterData) => async (dispatch) => {
  try {
    const { data } = await api.filterInstructorCourses(filterData);
    dispatch({ type: "FILTER_INSTRUCTOR_COURSES", payload: data });
  } catch (error) {
    console.log(error);
  }
};
