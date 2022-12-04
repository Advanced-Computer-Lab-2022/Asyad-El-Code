import { FETCH_CURRENCY_RATES} from "../constants/currencyRates";

export default (currencyRates = [], action) => {
    console.log("Iam here in the currency reducer");
    switch (action.type) {
        case FETCH_CURRENCY_RATES:
            console.log(action.payload)
            
            return action.payload;
        default:
            return currencyRates;
    }
};
