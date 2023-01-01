import axios from "axios";

const getRates = axios.create({
  baseURL:
    "https://api.apilayer.com/exchangerates_data/latest?symbols=USD,CAD,SAR,GBP,EUR,AED,CNY,EGP&base=EGP",
  headers: {
    "Content-Type": "application/json",
    apikey: "J3jIjdbO2jYuWh0Kc0IOEvV1U0OT75qt",
  },
});

export default getRates;
