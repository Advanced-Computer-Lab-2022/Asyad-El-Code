import { AUTH, AUTH_ERROR, CHANGE_PASSWORD } from "../constants/auth";
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

export const signin = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const result = await userApi.signin(formData);
    dispatch({ type: AUTH, payload: result.data });
    dispatch({ type: END_LOADING });

    history.push("/");
  } catch (error) {
    console.log("Iam here mannnnnn");
    dispatch({ type: AUTH_ERROR, payload: error.response.data });
    history.push("/auth");
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
