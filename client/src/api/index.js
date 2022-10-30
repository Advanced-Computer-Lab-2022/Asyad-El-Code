import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:8000" });

export const fetchCourses = async () => await API.get(`/course/getCourses`);

export const fetchAdmins = async () => await API.get(`/administrator`);

export const addAdmin = async (admin) => {
    return await API.post(`/administrator`, admin)
} 