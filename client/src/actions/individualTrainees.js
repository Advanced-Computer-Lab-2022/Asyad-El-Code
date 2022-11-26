import { FETCH_TRAINEE } from "../constants/individualTrainee";
import * as individualTraineeApi from "../api/individualTrainees";

export const getTrainee = () => async (dispatch) => {
  try {
    const { data } = await individualTraineeApi.fetchTrainee();
    dispatch({ type: FETCH_TRAINEE, payload: data });
  } catch (err) {
    console.log(err)
  }
}
