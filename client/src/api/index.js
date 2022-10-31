import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });


export const fetchCourses = async () => await API.get(`/course/getCourses`);

export const fetchAdmins = async () => await API.get(`/administrator`);

export const addAdmin = async (admin) => {
    return await API.post(`/administrator`, admin)
}
export const fetchInstructors = async () => await API.get(`/instructor`);

export const addInstructor = async (instructor) => {
    return await API.post(`/instructor`, instructor)
}

export const fetchCorporates = async () => await API.get(`/corporateTrainee`);

export const addCorporate = async (corporate) => {
    return await API.post(`/corporateTrainee`, corporate)
}
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



