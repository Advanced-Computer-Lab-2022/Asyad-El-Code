import { FETCH_ALL,ADD_ADMIN } from "../constants/admins";

export default (admins = [], action) => {
  console.log("Iam here in the admin reducer");
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case ADD_ADMIN:
      return [...admins,action.payload];
    default:
      return admins;
  }
};
