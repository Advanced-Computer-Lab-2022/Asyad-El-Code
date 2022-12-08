import { AUTH, LOGOUT, AUTH_ERROR } from "../constants/auth";

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

    default:
      return state;
  }
};
