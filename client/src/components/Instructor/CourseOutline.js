import React, { useState } from "react";
import {
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LectureDetails from "./LectureDetails";
import Exercise from "./Exercise";

const initialFormState = {
  outline: "",
  totalHours: "",
  subtitles: [],
};
export const CourseOutline = ({ submitOutlines }) => {
  const [isExpanded, setExpanded] = React.useState(true);
  const [initialForm, setInitialForm] = useState(initialFormState);
  const [open, setOpen] = useState([false, false]);
  const OpenLectureModal = () =>
    setOpen((prev) => {
      prev[0] = !prev[0];
      return [...prev];
    });

  const OpenQuizModal = () =>
    setOpen((prev) => {
      prev[1] = !prev[1];
      return [...prev];
    });
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    const val = e.target.value;
    const key = e.target.name;
    setInitialForm({ ...initialForm, [key]: val });
  };

  const submitContent = (state, type) => {
    if (type === "subtitles")
      setInitialForm({ ...initialForm, subtitles: state });
    else setInitialForm({ ...initialForm, exercises: state });
  };

  return (
    <div>
      <LectureDetails
        open={open[0]}
        handleClickOpen={OpenLectureModal}
        handleClose={OpenLectureModal}
        submitContent={submitContent}
      ></LectureDetails>

      <Exercise
        open={open[1]}
        handleClickOpen={OpenQuizModal}
        handleClose={OpenQuizModal}
        submitContent={submitContent}
      ></Exercise>

      <Grid item sm={12}>
        <div>
          <Accordion expanded={isExpanded}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Section 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container rowSpacing={4}>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Section name"
                    name="outline"
                    onChange={handleChange}
                  ></TextField>
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter Total Hours"
                    name="totalHours"
                    onChange={handleChange}
                  ></TextField>
                </Grid>
                <Grid item display="flex" justifyContent="end" container>
                  <Button onClick={OpenLectureModal}>Lecture</Button>
                  <Button onClick={OpenQuizModal}>Add Quiz</Button>
                  <Button onClick={() => submitOutlines(initialForm)}>
                    Submit Section
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </div>
      </Grid>
    </div>
  );
};
export default CourseOutline;
