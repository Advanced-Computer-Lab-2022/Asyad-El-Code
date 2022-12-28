import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/instructor" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const getAllInstructorCourses = async () =>
  await API.get(`/getAllInstructorCourses/635c587e07f18b986c357bb7`);

export const filterInstructorCourses = async (filterData) => {
  return await API.get(
    `/filterInstructorCourses/?id=635c587e07f18b986c357bb7&subject=${filterData.Subject}&price=${filterData.Price}&rating=${filterData.Rating}`
  );
};

export const fetchInstructors = async () => await API.get(`/`);

export const fetchInstructor = async () =>
  await API.get(`/635c587e07f18b986c357bb7`);

export const addInstructor = async (instructor) => {
  return await API.post(`/`, instructor);
};
export const updateInstructor = async (id, instructor) => {
  return await API.patch(`/updateInformation/${id}`, instructor);
};

// export const addMoneyToInstructorWallet = async (courseId, instructorId) => {
//   return await API.post(
//     `/addMoneyToInstructorWallet?courseId=${courseId}&instructorId=${instructorId}`
//   );
// };
