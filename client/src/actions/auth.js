import {
  AUTH,
  AUTH_ERROR,
  CHANGE_PASSWORD,
  SEND_EMAIL,
  GET_LOGGED_USER,
  FIRST_TIME_INSTRUCTOR_START_LOADING,
  FIRST_TIME_INSTRUCTOR_END_LOADING,
  START_LOADING_AUTH,
  END_LOADING_AUTH,
} from "../constants/auth";
import * as userApi from "../api/auth.js";

export const signup =
  (formData, history, setIsLoadingSignUp) => async (dispatch) => {
    try {
      setTimeout(() => {
        setIsLoadingSignUp(false);
      }, 2000);

      dispatch({ type: START_LOADING_AUTH });
      const result = await userApi.signup(formData);
      dispatch({ type: AUTH, payload: result.data });
      history.push("/");
      dispatch({ type: END_LOADING_AUTH });
    } catch (error) {
      console.log(error.message);
    }
  };

export const signin = (formData, history, setIsLoading, setInstructorModal) => async (dispatch) => {
  try {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    dispatch({ type: START_LOADING_AUTH });

    const result = await userApi.signin(formData);
    dispatch({ type: AUTH, payload: result.data });
    console.log("result.data", result.data);
    dispatch({ type: END_LOADING_AUTH });
    if (result.data.type === "instructor") {
      if(result.data.result.firstLogin){
        setInstructorModal(true);
      }else{
        history.push("/");
      }
    } else {
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: AUTH_ERROR, payload: error.response.data });
    history.push("/auth");
  }
};

export const sendEmail = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_AUTH });
    const result = await userApi.sendEmail(formData);
    dispatch({ type: SEND_EMAIL, payload: result.data });
    dispatch({ type: END_LOADING_AUTH });
  } catch (error) {
    console.log(error.message);
  }
};

export const changePasword = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_AUTH });
    const { data } = await userApi.changePassword(formData, id);
    dispatch({ type: CHANGE_PASSWORD, payload: data });
    dispatch({ type: END_LOADING_AUTH });
  } catch (error) {
    console.log(error.message);
  }
};

export const getLoggedUser = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_AUTH });
    const result = await userApi.getLoggedUser();
    dispatch({ type: GET_LOGGED_USER, payload: result.data });
    dispatch({ type: END_LOADING_AUTH });
  } catch (error) {
    console.log(error.message);
  }
};

export const firstTimeInstructor = (formData, id, history) => async (dispatch) => {
  try {
    dispatch({ type: FIRST_TIME_INSTRUCTOR_START_LOADING });
    const result = await userApi.firstTimeInstructor(formData, id);
    dispatch({ type: AUTH, payload: result.data });
    dispatch({ type: FIRST_TIME_INSTRUCTOR_END_LOADING });
    history.push("/");
  } catch (error) {
    console.log(error.message);
  }
};