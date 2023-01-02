import {
  CHANGE_SELECTED_COUNTRY,
  GET_SELECTED_COUNTRY,
} from "../constants/currencyRates";

export default (selectedCountry = "", action) => {
  switch (action.type) {
    case GET_SELECTED_COUNTRY:
      return action.payload;
    case CHANGE_SELECTED_COUNTRY:
      return action.payload;
    default:
      return selectedCountry;
  }
};
