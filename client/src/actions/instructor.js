import * as api from "../api/index";
import { FETCH_ALL,FETCH_INSTRUCTORS, ADD_INSTRUCTOR } from "../constants/instructors";

export const getInstructors = () => async (dispatch) => {
  try {
    console.log("IAM HERE");
    const { data } = await api.fetchInstructors();
    console.log(data);
    console.log("INSTRUCTOR FETCH_ALL ACTION");
    dispatch({ type: FETCH_INSTRUCTORS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addInstructor = (instructor) => async (dispatch) => {
    try {
        
      const res = await api.addInstructor(instructor);
      console.log(res.data);
      if(res.status===200)
        dispatch({ type: ADD_INSTRUCTOR, payload: res.data}); 
    } catch (error) {
      console.log(error);
    }
  };