import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { InputLabel } from "@mui/material";

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider(props) {
  function getSign() {
    switch (selectedCountry) {
      case "USA":
        return "USD";
      case "Egypt":
        return "EGP";
      case "UAE":
        return "AED";
      case "Canada":
        return "CAD";
      case "Germany":
        return "EUR";
      case "China":
        return "CNY";
      case "UK":
        return "GBP";
      case "KSA":
        return "SAR";
      default:
        return "EGP";
    }
  }
  const selectedCountry = useSelector((c) => c.selectedCountry);
  const { isLoading, currencyRates } = useSelector(
    (state) => state.currencyRates
  );
  console.log("selected Country", selectedCountry);
  const [max, setMax] = useState(1000);

  const [value, setValue] = React.useState([0, max]);
  const [modifyValue, setModifyValue] = useState([0, max]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setModifyValue(newValue);
    props.form(event, modifyValue);
  };

  return (
    <Box sx={{ width: 100 }}>
      {/* <InputLabel id="price-range-label">Price</InputLabel> */}
      <Slider
        aria-label="Price Range"
        getAriaLabel={() => "Price Range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        max={
          selectedCountry === ""
            ? 1000
            : 1000 * currencyRates[getSign(selectedCountry)]
        }
      />
    </Box>
  );
}
