import { FETCH_TRAINEE } from "../constants/individualTrainee";

export default (individualTrainees = {}, action) => {
  console.log("Iam here in the Trainee reducer");
  switch (action.type) {
    case FETCH_TRAINEE:
      return action.payload;
    default:
      return individualTrainees;
  }
};
