import axios from "axios";

const getRates = axios.create({
  baseURL:
    "https://api.apilayer.com/exchangerates_data/latest?symbols=USD,CAD,SAR,GBP,EUR,AED,CNY,EGP&base=EGP",
  headers: {
    "Content-Type": "application/json",
    apikey: "PU7LE1rDgFEkEoxbPvsxHWva32ECgSi0",
  },
});

export default getRates;
