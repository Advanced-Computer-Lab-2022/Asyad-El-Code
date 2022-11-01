import * as api from "../api/corporate";
import { FETCH_CORPORATES, ADD_CORPORATE } from "../constants/corporate";

export const getCorporates = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCorporates();
    console.log(data);
    console.log("aSDSDASDSDASDSDAD");
    dispatch({ type: FETCH_CORPORATES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addCorporate = (corporate) => async (dispatch) => {
    try {
        
      const res = await api.addCorporate(corporate);
      console.log(res.data);
      if(res.status===200)
        dispatch({ type: ADD_CORPORATE, payload: res.data});
    } catch (error) {
      console.log(error);
    }
  };