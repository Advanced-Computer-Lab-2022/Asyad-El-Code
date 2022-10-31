import { FETCH_CORPORATES,ADD_CORPORATE } from "../constants/corporate";

export default (corporates = [], action) => {
  console.log("Iam here in the corperate reducer");
  switch (action.type) {
    case FETCH_CORPORATES:
      return action.payload;
    case ADD_CORPORATE:
      return [...corporates,action.payload];
    default:
      return corporates;
  }
};
