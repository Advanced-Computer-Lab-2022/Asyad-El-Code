import { FETCH_CURRENCY_RATES, START_LOADING, END_LOADING } from "../constants/currencyRates";

export default (state = {isLoading: true, currencyRates : []}, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_CURRENCY_RATES:
            return { ...state, currencyRates: action.payload };
        default:
            return state;
    }
};
