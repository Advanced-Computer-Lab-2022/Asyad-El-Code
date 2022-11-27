import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/course" });

export const fetchCourses = async () => await API.get(`/getCourses`);
export const filterCourses = async (filterData) =>
  await API.get(
    `/filterAllCourses/?subject=${filterData.Subject}&price=${filterData.Price}&rating=${filterData.Rating}`
  );
export const filterByTilteOrSubjectOrInstructor = async (searchQuery) =>
  await API.get(`/findCourse?searchQuery${searchQuery}`);

export const createCourse = async (course) => {
  return await API.post("/", course);
};