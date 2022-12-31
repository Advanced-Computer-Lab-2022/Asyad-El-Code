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
  const selectedCountry = useSelector((c) => c.selectedCountry);
  const rates = useSelector((c) => c.currencyRates);
  const [max, setMax] = useState(10000);

  const [value, setValue] = React.useState([0, max]);
  const handleChange = (event, newValue) => {
    props.form(event, newValue);
    setValue(newValue);
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
            ? 10000
            : (10000 * rates[selectedCountry]).toFixed(0)
        }
      />
    </Box>
  );
}
