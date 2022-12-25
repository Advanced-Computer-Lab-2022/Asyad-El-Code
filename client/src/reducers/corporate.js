import { FETCH_CORPORATES, ADD_CORPORATE, GET_TRAINEE } from "../constants/corporate";

export default (corporates = [], action) => {
  console.log("Iam here in the corperate reducer");
  switch (action.type) {
    case FETCH_CORPORATES:
      return action.payload;
    case ADD_CORPORATE:
      return [...corporates, action.payload];
    case GET_TRAINEE:
      return action.payload;
    default:
      return corporates;
  }
};
