import { FETCH_TRAINEE,GET_TRAINEE ,UPDATE_TRAINEE} from "../constants/individualTrainee";

export default (individualTrainees = {}, action) => {
  console.log("Iam here in the Trainee reducer");
  console.log(action)
  switch (action.type) {
    case FETCH_TRAINEE:
      return action.payload;
    case GET_TRAINEE:
      return individualTrainees;
    case UPDATE_TRAINEE:
      return action.payload;
    default:
      return individualTrainees;
  }
};
