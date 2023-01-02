import { ADD_ADMIN, FETCH_ADMINS } from "../constants/admins";

export default (admins = [], action) => {
  switch (action.type) {
    case FETCH_ADMINS:
      return action.payload;
    case ADD_ADMIN:
      return [...admins, action.payload];
    default:
      return admins;
  }
};
