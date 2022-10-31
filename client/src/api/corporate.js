import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/corporateTrainee" });




export const fetchCorporates = async () => await API.get(`/`);

export const addCorporate = async (corporate) => {
    return await API.post(`/`, corporate)
}