import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider(props) {
  const [value, setValue] = React.useState([0.0, 5.0]);

  const handleChange = (event, newValue) => {
    props.form(event, newValue);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 100 }}>
      <Slider
        aria-label="Rating Range"
        getAriaLabel={() => "Rating Range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        max="5.0"
      />
    </Box>
  );
}
