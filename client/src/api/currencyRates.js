import axios from "axios";

const getRates = axios.create({
  baseURL:
    "https://api.apilayer.com/exchangerates_data/latest?symbols=USD,CAD&base=EGP",
  headers: {
    "Content-Type": "application/json",
    apikey: "AE3jgYruyGmKIBHWRw91pvA92Z1cVP19",
  },
});

export default getRates;
