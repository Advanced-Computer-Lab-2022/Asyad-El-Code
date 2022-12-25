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
  return await API.post(`/`, admin);
};
