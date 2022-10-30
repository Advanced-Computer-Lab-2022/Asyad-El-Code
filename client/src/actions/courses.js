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
