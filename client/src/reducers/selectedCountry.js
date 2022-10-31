import { CHANGE_SELECTED_COUNTRY, GET_SELECTED_COUNTRY} from "../constants/currencyRates";

export default (selectedCountry = "", action) => {
    console.log("Iam here in the country reducer");
    switch (action.type) {
        case GET_SELECTED_COUNTRY:
            console.log(action.payload)
            return action.payload
        case CHANGE_SELECTED_COUNTRY:
            console.log(action.payload)
            return action.payload
        default:
            return selectedCountry;
    }
};
