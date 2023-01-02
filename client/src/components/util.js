export const getRate = (selectedCountry, rates, price) => {
  switch (selectedCountry) {
    case "USA":
      return "$" + (price * rates["USD"])?.toFixed(2) + " USD";
    case "Egypt":
      return "E£" + (price * rates["EGP"]).toFixed(2) + " EGP";
    case "UAE":
      return (price * rates["AED"]).toFixed(2) + " AED";
    case "Canada":
      return "C$" + (price * rates["CAD"]).toFixed(2) + " CAD";
    case "Germany":
      return "€" + (price * rates["EUR"]).toFixed(2) + " EUR";
    case "China":
      return "¥" + (price * rates["CNY"]).toFixed(2) + " CNY";
    case "UK":
      return "£" + (price * rates["GBP"]).toFixed(2);
    case "KSA":
      return (price * rates["SAR"]).toFixed(2) + " SR";
    default:
      return "E£" + price.toFixed(2) + " EGP";
  }
};
export const getEGP = (selectedCountry, rates, price) => {
  switch (selectedCountry) {
    case "USA":
      return (price / rates["USD"]).toFixed(2);
    case "Egypt":
      return price.toFixed(2);
    case "UAE":
      return (price / rates["AED"]).toFixed(2);
    case "Canada":
      return (price / rates["CAD"]).toFixed(2);
    case "Germany":
      return (price / rates["EUR"]).toFixed(2);
    case "China":
      return (price / rates["CNY"]).toFixed(2);
    case "UK":
      return (price / rates["GBP"]).toFixed(2);
    case "KSA":
      return (price / rates["SAR"]).toFixed(2);
    default:
      return price.toFixed(2);
  }
};
