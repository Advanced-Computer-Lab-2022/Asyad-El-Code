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

export const addAdmin = async (admin) => {
  return await API.post(`/`, admin);
};
