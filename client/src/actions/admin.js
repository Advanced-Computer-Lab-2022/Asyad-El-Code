import * as api from "../api/admin";
import { FETCH_ADMINS, ADD_ADMIN } from "../constants/admins";

export const getAdmins = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAdmins();
    dispatch({ type: FETCH_ADMINS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addAdmin = (admin) => async (dispatch) => {
  try {
    const res = await api.addAdmin(admin);
    if (res.status === 200) dispatch({ type: ADD_ADMIN, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
