import { FETCH_TRAINEE, UPDATE_TRAINEE } from "../constants/individualTrainee";
import * as individualTraineeApi from "../api/individualTrainees";

export const getTrainee = () => async (dispatch) => {
  try {
    const { data } = await individualTraineeApi.fetchTrainee();
    console.log("YESSS")
    console.log(data)
    dispatch({ type: FETCH_TRAINEE, payload: data });
  } catch (err) {
    console.log("FUCKK")
    console.log(err)
  }
}

export const fetchTrainee = () => async (dispatch) => {
  try {
    const { data } = await individualTraineeApi.fetchTrainee();
    console.log("YESSS")
    console.log(data)
    dispatch({ type: "GET_TRAINEE", payload: data });
  } catch (err) {
    console.log("FUCKK")
    console.log(err)
  }
}

export const updateTrainee = (id, trainee) => async (dispatch) => {
  try {
    const { data } = await individualTraineeApi.updateTrainee(id, trainee);
    dispatch({ type: UPDATE_TRAINEE, payload: data });
  } catch (err) {
    console.log(err);
  }
}
