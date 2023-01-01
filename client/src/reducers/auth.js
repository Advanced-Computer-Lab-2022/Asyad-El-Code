import {
  AUTH,
  LOGOUT,
  AUTH_ERROR,
  CHANGE_PASSWORD,
  SEND_EMAIL,
  UPDATE_INSTRUCTOR,
  FIRST_TIME_INSTRUCTOR_START_LOADING,
  FIRST_TIME_INSTRUCTOR_END_LOADING
} from "../constants/auth";
import { END_LOADING, START_LOADING } from "../constants/courses";

export default (
  state = { authData: null, error: null, isLoading: false, firstTimeInstructorIsLoading:false },
  action
) => {
  console.log("Iam in the auth reducer", action?.payload);

  switch (action.type) {
    case AUTH:
      console.log("AUTH REDUCER", action?.payload);
      console.log(action?.payload.type);
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload, error: null };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, error: null };

    case AUTH_ERROR:
      return { ...state, error: action?.payload };

    case CHANGE_PASSWORD:
      return { ...state, authData: action?.payload, error: null };
    case UPDATE_INSTRUCTOR:
      return { ...state, authData: action?.payload };

    case SEND_EMAIL:
      return state;
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FIRST_TIME_INSTRUCTOR_START_LOADING:
      return {...state, firstTimeInstructorIsLoading:true}
    case FIRST_TIME_INSTRUCTOR_END_LOADING:
      return {...state, firstTimeInstructorIsLoading:false}
    default:
      return state;
  }
};
