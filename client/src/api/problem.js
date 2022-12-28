import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/reportedProblems" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
      }`;
  }
  return req;
});

export const reportProblem = async (problem) => await API.post(`/`, problem);

export const getAllProblems = async () => await API.get(`/`);

export const updateProblem = async (id, problem) =>
  await API.put(`/${id}`, problem);

export const getUnresolvedProblems = async (email) => await API.post(`/getUnResolvedProblems`, email);

export const getResolvedProblems = async (email) => await API.post(`/getResolvedProblems`, email);