import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider(props) {
  const [value, setValue] = React.useState([0, 100]);
  const handleChange = (event, newValue) => {
    props.form(event, newValue);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 150 }}>
      <Slider
        aria-label="Price Range"
        getAriaLabel={() => "Price Range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
