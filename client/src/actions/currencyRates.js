import getRates from "../api/currencyRates";
import { FETCH_CURRENCY_RATES, START_LOADING, END_LOADING } from "../constants/currencyRates";

export const getCurrencyRates = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await getRates();
    console.log(data.rates.USD);
    console.log(data.rates.CAD);
    dispatch({ type: FETCH_CURRENCY_RATES, payload: data.rates });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
