import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/corporateTrainee" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchCorporates = async () => await API.get(`/`);

export const addCorporate = async (corporate) => {
  return await API.post(`/`, corporate);
};

export const getCorporate = async () =>
  await API.get(`/${JSON.parse(localStorage.getItem("profile")).result._id}`);
