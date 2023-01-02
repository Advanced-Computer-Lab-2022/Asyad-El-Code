import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/administrator" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchAdmins = async () => await API.get(`/`);

export const getAllCourseRequests = async () => await API.get(`/courseRequests`);

export const acceptCourseRequest = async (request) => {
  return await API.post(`/acceptCourseRequest`, request);
}

export const rejectCourseRequest = async (request) => {
  return await API.post(`/rejectCourseRequest`, request);
}

export const deleteCourseRequest = async (id) => {
  return await API.delete(`/deleteCourseRequest/${id}`);
}

export const addAdmin = async (admin) => {
  return await API.post(`/addAdmin`, admin);
};

export const addInstructor = async (instructor) => {
  return await API.post(`/addInstructor`, instructor);
};

export const addCorporate = async (corporate) => {
  return await API.post(`/addCorporate`, corporate);
};

export const provideCourse = async (courseId, corpId) =>
  await API.post(
    `/provideCourse?courseId=${courseId}&id=${corpId}`
  );

export const getRefunds = async () => await API.get(`/refunds`);

export const refundCourse = async (request) => await API.post(`/refundCourse`, request);

export const acceptRefund = async (request) => await API.post(`/acceptRefund`, request);

export const rejectRefund = async (request) => await API.post(`/rejectRefund`, request);

export const deleteRefundRequest = async (id) => await API.delete(`/deleteRefundRequest/${id}`);