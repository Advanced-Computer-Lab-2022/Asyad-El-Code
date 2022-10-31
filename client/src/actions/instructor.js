import * as instructorApi from "../api/instructor";

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
