import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });


export const fetchCourses = async () => await API.get(`/course/getCourses`);
export const filterCourses = async (filterData) =>
  await API.get(
    `/course/filterAllCourses/?subject=${filterData.Subject}&price=${filterData.Price}&rating=${filterData.Rating}`
  );
export const getAllInstructorCourses = async () =>
  await API.get(`/instructor/getAllInstructorCourses/635c587e07f18b986c357bb7`);
export const filterInstructorCourses = async (filterData) => {
  return await API.get(
    `/instructor/filterInstructorCourses/?id=635c587e07f18b986c357bb7&subject=${filterData.Subject}&price=${filterData.Price}&rating=${filterData.Rating}`
  );
};



