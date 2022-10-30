import * as courseApi from "../api/course";
import { FILTER_COURSES } from "../constants/courses";

export const getCourses = () => async (dsipatch) => {
  try {
    const { data } = await courseApi.fetchCourses();
    dsipatch({ type: "FETCH_ALL", payload: data });
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