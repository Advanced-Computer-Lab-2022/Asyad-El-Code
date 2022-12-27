import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/users" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signup = async (formData) => {
  return await API.post("/signup", formData);
};

export const signin = async (formData) => {
  return await API.post("/signin", formData);
};

export const changePassword = async (formData, id) => {
  return await API.post(`/confirmPassword/${id}`, formData);
};
export const sendEmail = async (formData) => {
  return await API.post("/sendEmail", formData);
};

export const getLoggedUser = async () => {
  return await API.get(
    `/getLoggedUser?id=${
      JSON.parse(localStorage.getItem("profile")).result._id
    }&token=${JSON.parse(localStorage.getItem("profile")).token}&type=${
      JSON.parse(localStorage.getItem("profile")).type
    }`
  );
};
