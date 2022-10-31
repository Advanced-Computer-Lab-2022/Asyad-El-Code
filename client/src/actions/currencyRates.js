import getRates from "../api/currencyRates";
import { FETCH_CURRENCY_RATES } from "../constants/currencyRates";

export const getCurrencyRates = () => async (dispatch) => {
  try {
    const { data } = await getRates();
    console.log(data.rates.USD);
    console.log(data.rates.CAD);
    dispatch({ type: FETCH_CURRENCY_RATES, payload: data.rates });
  } catch (error) {
    console.log(error);
  }
};
