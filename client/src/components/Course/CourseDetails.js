import { Paper } from "@mui/material";
import React from "react";

export const CourseDetails = ({ itemTitle }) => {
  return (
    
    <Paper sx={{ width: "340px", height: "340px" }}>
      <h1>{itemTitle} </h1>
    </Paper>
  );
};
export default CourseDetails;
