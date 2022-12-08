import { AUTH } from "../constants/auth";
import * as userApi from "../api/auth.js";

export const signup = (formData, history) => async (dispatch) => {
  try {
    const result = await userApi.signup(formData);
    console.log("Iam in the result maaan", result);
    console.log("THIS IS THE DATA", result.data);
    dispatch({ type: AUTH, payload: result.data });
    history.push("/");
  } catch (error) {
    console.log(error.message);
  }
};

export const signin = (formData, history) => async (dispatch) => {
  try {
    const result = await userApi.signin(formData);
    dispatch({ type: AUTH, payload: result.data });
    history.push("/");
  } catch (error) {
    console.log("Iam here mannnnnn");
    dispatch({ type: AUTH, payload: error.response.data });
    history.push("/auth");
  }
};
