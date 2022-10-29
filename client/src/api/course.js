import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/course" });

export const fetchCourses = async () => await API.get(`/getCourses`);

export const filterByTilteOrSubjectOrInstructor = async (searchQuery) =>
  await API.get(`/findCourse?searchQuery${searchQuery}`);
