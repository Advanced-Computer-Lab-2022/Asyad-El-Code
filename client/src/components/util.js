export const getRate = (selectedCountry,price,rates)=>{
    switch(selectedCountry){
        case "USD":
            return "$"+(price*rates[selectedCountry]).toFixed(2)+" USD"
        case "EGP":
            return "E£"+(price*rates[selectedCountry]).toFixed(2)+" EGP"
        case "AED":
            return (price*rates[selectedCountry]).toFixed(2)+" AED"
        case "CAD":
            return "C$"+(price*rates[selectedCountry]).toFixed(2)+" CAD"
        case "EUR":
            return "€"+(price*rates[selectedCountry]).toFixed(2)+" EUR"
        case "CNY":
            return "¥"+(price*rates[selectedCountry]).toFixed(2)+" CNY"
        case "GBP":
            return "£"+(price*rates[selectedCountry]).toFixed(2)
        case "SAR":
            return (price*rates[selectedCountry]).toFixed(2)+ " SR"
        default:
            return "E£"+(price).toFixed(2)+" EGP"
    }
}