import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/individualTrainee",
});

export const fetchTrainee = async () =>
  await API.get(`/6352c07584a5db1f743a94a6`);

export const updateTrainee = async (id, trainee) =>
  await API.put(`/${id}`, trainee);
