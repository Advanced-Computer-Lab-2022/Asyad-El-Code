import { FETCH_TRAINEE, UPDATE_TRAINEE } from "../constants/individualTrainee";

export default (individualTrainee = {}, action) => {
  switch (action.type) {
    case FETCH_TRAINEE: {
      console.log("Iam in the freducer o individiilatTriannee");
      console.log(action.payload);
      return action.payload;
    }
    case "GET_TRAINEE":
      return action.payload;
    case UPDATE_TRAINEE:
      return action.payload;
    default:
      return individualTrainee;
  }
};
