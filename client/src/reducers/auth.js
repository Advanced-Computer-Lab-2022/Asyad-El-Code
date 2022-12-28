import {
  AUTH,
  LOGOUT,
  AUTH_ERROR,
  CHANGE_PASSWORD,
  SEND_EMAIL,
} from "../constants/auth";

export default (state = { authData: null }, action) => {
  console.log("Iam in the auth reducer", action?.payload);
  switch (action.type) {
    case AUTH:
      console.log("AUTH REDUCER", action?.payload);
      console.log(action?.payload.type);
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    case AUTH_ERROR:
      return { ...state, authData: action?.payload };

    case CHANGE_PASSWORD:
      return { ...state, authData: action?.payload };

    case SEND_EMAIL:
      return state;
    default:
      return state;
  }
};
