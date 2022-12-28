import {
  AUTH,
  AUTH_ERROR,
  CHANGE_PASSWORD,
  SEND_EMAIL,
  GET_LOGGED_USER,
} from "../constants/auth";
import * as userApi from "../api/auth.js";
import { END_LOADING, START_LOADING } from "../constants/courses";

export const signup = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const result = await userApi.signup(formData);
    console.log("Iam in the result maaan", result);
    console.log("THIS IS THE DATA", result.data);
    dispatch({ type: AUTH, payload: result.data });
    history.push("/");
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const signin = (formData, history, setIsLoading) => async (dispatch) => {
  try {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    dispatch({ type: START_LOADING });

    const result = await userApi.signin(formData);
    console.log("I ALREADY IN FRIEND??");
    dispatch({ type: AUTH, payload: result.data });
    dispatch({ type: END_LOADING });
    setTimeout(() => {
      history.push("/");
    }, 3000);
  } catch (error) {
    console.log("Iam here mannnnnn");
    console.log("FUC FUCK FUCK ERROR");
    console.log(error);
    dispatch({ type: AUTH_ERROR, payload: error.response.data });
    history.push("/auth");
  }
};

export const sendEmail = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const result = await userApi.sendEmail(formData);
    dispatch({ type: SEND_EMAIL, payload: result.data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const changePasword = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await userApi.changePassword(formData, id);
    dispatch({ type: CHANGE_PASSWORD, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getLoggedUser = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const result = await userApi.getLoggedUser();
    console.log("RESULT?????", result);
    dispatch({ type: GET_LOGGED_USER, payload: result.data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log("HERE ERROR");
    console.log(error.message);
  }
};
