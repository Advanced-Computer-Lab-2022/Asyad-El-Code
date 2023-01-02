import {
  FETCH_CORPORATES,
  ADD_CORPORATE,
  GET_CORPORATE,
} from "../constants/corporate";

export default (corporates = [], action) => {
  switch (action.type) {
    case FETCH_CORPORATES:
      return action.payload;
    case ADD_CORPORATE:
      return [...corporates, action.payload];
    case GET_CORPORATE:
      return action.payload;
    default:
      return corporates;
  }
};
