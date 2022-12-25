import getRates from "../api/currencyRates";
import {
  GET_SELECTED_COUNTRY, CHANGE_SELECTED_COUNTRY, START_LOADING,
  END_LOADING
} from "../constants/currencyRates";

export const getSelectedCountry = () => async (dispatch) => {
  try {

    dispatch({ type: GET_SELECTED_COUNTRY, payload: "EGYPT" });
  } catch (error) {
    console.log(error);
  }
};

export const changeSelectedCountry = (country) => async (dispatch) => {
  try {

    dispatch({ type: CHANGE_SELECTED_COUNTRY, payload: country });
  } catch (error) {
    console.log(error);
  }
};