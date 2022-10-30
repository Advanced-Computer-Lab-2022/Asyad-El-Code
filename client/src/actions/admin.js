import * as api from "../api/index";
import { FETCH_ALL, ADD_ADMIN } from "../constants/admins";

export const getAdmins = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAdmins();
    console.log(data);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addAdmin = (admin) => async (dispatch) => {
    try {
        
      const res = await api.addAdmin(admin);
      console.log(res.data);
      if(res.status===200)
        dispatch({ type: ADD_ADMIN, payload: res.data});
    } catch (error) {
      console.log(error);
    }
  };