import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const fetchCourses = async () => await API.get(`/course/getCourses`);
export const filterCourses = async (filterData) =>
  await API.get(
    `/course/filterAllCourses/?subject=${filterData.Subject}&price=${filterData.Price}&rating=${filterData.Rating}`
  );
