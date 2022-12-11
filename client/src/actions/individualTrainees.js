import { FETCH_TRAINEE, UPDATE_TRAINEE } from "../constants/individualTrainee";
import * as individualTraineeApi from "../api/individualTrainees";

export const getTrainee = () => async (dispatch) => {
  try {
    const { data } = await individualTraineeApi.fetchTrainee();
    console.log("The data of trainne in backend is  ", data);
    dispatch({ type: FETCH_TRAINEE, payload: data });
    console.log("IT IS PASSED FRIEND");
  } catch (err) {
    console.log("ERROR HAPPENS FRIEND");
    console.log(err);
  }
};

export const updateTrainee = (id, trainee) => async (dispatch) => {
  try {
    const { data } = await individualTraineeApi.updateTrainee(id, trainee);
    dispatch({ type: UPDATE_TRAINEE, payload: data });
  } catch (err) {
    console.log(err);
  }
};
