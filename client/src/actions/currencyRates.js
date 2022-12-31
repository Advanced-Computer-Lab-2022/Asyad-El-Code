import getRates from "../api/currencyRates";
import {
  FETCH_CURRENCY_RATES,
  START_LOADING_CURRENCY,
  END_LOADING_CURRENCY,
} from "../constants/currencyRates";

export const getCurrencyRates = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_CURRENCY });
    const { data } = await getRates();
    console.log(data.rates.USD);
    console.log(data.rates.CAD);
    dispatch({ type: FETCH_CURRENCY_RATES, payload: data.rates });
    dispatch({ type: END_LOADING_CURRENCY });
  } catch (error) {
    console.log(error);
  }
};
