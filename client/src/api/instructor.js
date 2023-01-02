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

export const getAllInstructorCourses = async (id) =>
  await API.get(
    `/getAllInstructorCourses/${
      JSON.parse(localStorage.getItem("profile")).result._id
    }`
  );

export const filterInstructorCourses = async (id, filterData) => {
  return await API.get(
    `/filterInstructorCourses/?id=${id}&subject=${filterData.Subject}&price=${filterData.Price}&rating=${filterData.Rating}`
  );
};

export const fetchInstructors = async () => await API.get(`/`);

export const fetchInstructor = async () =>
  await API.get(`/635c587e07f18b986c357bb7`);

export const updateInstructor = async (id, instructor) => {
  return await API.patch(`/updateInformation/${id}`, instructor);
};

export const definePromotion = async (
  courseId,
  discount,
  startDate,
  endDate
) => {
  return await API.patch(
    `/definePromotion?courseId=${courseId}&discount=${discount}&startDate=${startDate}&endDate=${endDate}`
  );
};

export const getUserNames = async (id) => {
  return await API.get(`/getUserNames/${id}`);
};

// export const addMoneyToInstructorWallet = async (courseId, instructorId) => {
//   return await API.post(
//     `/addMoneyToInstructorWallet?courseId=${courseId}&instructorId=${instructorId}`
//   );
// };
