import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/individualTrainee",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchTrainee = async () =>
  await API.get(`/${JSON.parse(localStorage.getItem("profile")).result._id}`);

export const updateTrainee = async (id, trainee) =>
  await API.put(`/${id}`, trainee);
