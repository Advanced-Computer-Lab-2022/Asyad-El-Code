import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Alert, Button, Grid, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import LectureDetails from "./LectureDetails";
import CourseOutline from "./CourseOutline";

const drawerWidth = 240;

const initialFormState = {
  title: "",
  summary: "",
  subject: "",
  duration: "",
  releaseDate: "",
  language: "",
  image: "",
  rating: "",
  previewVideo: "",
  outlines: "",

  price: "",
  instructor: {
    instructorId: "",
    name: "",
  },
  discount: [{ country: "", precentage: "" }],
};
function CreateCourse(props) {
  return (
    <Grid container rowSpacing={4}>
      <Grid item sm={12}>
        <Alert severity="info">This is an info alert — check it out!</Alert>
      </Grid>
      <CourseOutline submitOutlines={submitOutlines}></CourseOutline>
    </Grid>
  );
}

export default CreateCourse;
