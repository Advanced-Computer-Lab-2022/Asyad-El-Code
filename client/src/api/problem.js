import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/reportedProblems" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const reportProblem = async (problem) => await API.post(`/`, problem);
