import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", width: "150px" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <Typography variant="body2" color="#fff">
          Progress
        </Typography>
        <LinearProgress variant="determinate" {...props} color="inherit" />
      </Box>
      <Box sx={{ minWidth: 35 }} alignContent="center">
        <Typography variant="body2" color="#fff">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({ progress }) {
  //   const [progress, setProgress] = React.useState(10);

  //   React.useEffect(() => {
  //     const timer = setInterval(() => {
  //       setProgress((prevProgress) =>
  //         prevProgress >= 100 ? 10 : prevProgress + 10
  //       );
  //     }, 800);
  //     return () => {
  //       clearInterval(timer);
  //     };
  //   }, []);

  return (
    <Box sx={{ width: "50%" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
