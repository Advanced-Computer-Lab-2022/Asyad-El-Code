import {
  AUTH,
  LOGOUT,
  AUTH_ERROR,
  CHANGE_PASSWORD,
  SEND_EMAIL,
  UPDATE_INSTRUCTOR,
  START_LOADING_AUTH,
  END_LOADING_AUTH,
  GET_LOGGED_USER,
} from "../constants/auth";

export default (
  state = { authData: null, error: null, isLoading: false },
  action
) => {
  switch (action.type) {
    case AUTH:
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
    case START_LOADING_AUTH:
      return { ...state, isLoading: true };
    case END_LOADING_AUTH:
      return { ...state, isLoading: false };

    case GET_LOGGED_USER:
      //Set localstoreage
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };

    default:
      return state;
  }
};
