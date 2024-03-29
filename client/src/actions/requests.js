import * as api from "../api/admin";
import * as corpApi from "../api/corporate";
import {
  FETCH_REQUESTS,
  DELETE_REQUEST,
  ACCEPT,
  REJECT,
  ADD_REQUEST
} from "../constants/requests";

export const addCourseRequest = (request) => async (dispatch) => {
  try {
    const { data } = await corpApi.addCourseRequest(request);
    dispatch({ type: ADD_REQUEST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getCourseRequests = () => async (dispatch) => {
  try {
    const { data } = await api.getAllCourseRequests();
    dispatch({ type: FETCH_REQUESTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const acceptCourseRequest = (request) => async (dispatch) => {
  try {
    const res = await api.acceptCourseRequest(request);
    if (res.status === 200) dispatch({ type: ACCEPT, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const rejectCourseRequest = (request) => async (dispatch) => {
  try {
    const res = await api.rejectCourseRequest(request);
    if (res.status === 200) dispatch({ type: REJECT, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCourseRequest = (id) => async (dispatch) => {
  try {
    await api.deleteCourseRequest(id);
    dispatch({ type: DELETE_REQUEST, payload: id });
  } catch (error) {
    console.log(error);
  }
};
