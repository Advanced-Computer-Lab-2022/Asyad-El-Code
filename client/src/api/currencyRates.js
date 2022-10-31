import axios from "axios";

const getRates = axios.create({
    baseURL: "https://api.apilayer.com/exchangerates_data/latest?symbols=USD,CAD&base=EGP",
    headers: {
        "Content-Type": "application/json",
        "apikey": "5lkMeupAowa5M5inZrt198T7QlFZ5GS8",
    },
});

export default getRates;

