import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/administrator" });



export const fetchAdmins = async () => await API.get(`/`);

export const addAdmin = async (admin) => {
    return await API.post(`/`, admin)
}
export const fetchInstructors = async () => await API.get(`/instructor`);

export const addInstructor = async (instructor) => {
    return await API.post(`/instructor`, instructor)
}

