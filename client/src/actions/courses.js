import * as api from "../api/index";

export const getCourses = () => async (dsipatch) => {
  try {
    const { data } = await api.fetchCourses();
    dsipatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};
