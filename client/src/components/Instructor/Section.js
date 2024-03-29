import React, { useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Button,
  Grid,
  TextField,
  Link,
  Divider,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import LectureDetails from "./LectureDetails";
import Exercise from "./Exercise";
import AlertDialog from "./Alert";

const Section = (props) => {
  // console.log(props.initialForm);
  const [expanded, setExpanded] = useState("");
  const [open, setOpen] = useState([false, false]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("Delete Section");
  const [alertMessage, setAlertMessage] = useState(
    "Are you sure you want to premenantly delete this section?"
  );
  const [initialForm, setInitialForm] = useState(props.initialForm);

  useEffect(() => {
    props.updateSection(props.id, initialForm);
  }, [initialForm]);

  const handleChangeAcc = (panel) => (evt, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    const key = e.target.name;

    setInitialForm({ ...initialForm, [key]: val });
  };

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

  const handleAlertDialogue = () => {
    setOpenAlert(!openAlert);
  };

  const submitContent = (state, type) => {
    if (type === "subtitles") {
      setInitialForm({
        ...initialForm,
        subtitles: [...initialForm.subtitles, state],
        totalHours: parseInt(initialForm.totalHours) + parseInt(state.minutes),
      });
      OpenLectureModal();
    } else {
      // assuming that an exercise takes 5 minutes
      setInitialForm({
        ...initialForm,
        exercises: [...initialForm.exercises, state],
        totalHours: parseInt(initialForm.totalHours) + 5,
      });
      OpenQuizModal();
    }
  };

  const submitSection = () => {
    props.submitOutline(props.id, initialForm);
  };

  const deleteSection = () => {
    props.deleteSection(props.id);
    handleAlertDialogue();
  };

  return (
    <form>
      <LectureDetails
        open={open[0]}
        handleClose={OpenLectureModal}
        submitContent={submitContent}
      ></LectureDetails>

      <Exercise
        open={open[1]}
        handleClose={OpenQuizModal}
        submitContent={submitContent}
      ></Exercise>

      <AlertDialog
        open={openAlert}
        handleClose={handleAlertDialogue}
        title={alertTitle}
        message={alertMessage}
        action={deleteSection}
        color="error"
      ></AlertDialog>

      <Accordion
        key={props.id}
        expanded={expanded === props.sd}
        onChange={handleChangeAcc(props.sd)}
        sx={{ margin: "20px" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="panel1bh-header"
          aria-controls="panel1bh-content"
        >
          <Typography variant="h6"> Section no.{props.id} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container rowSpacing={2}>
            <Grid item sm={12}>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Section name"
                name="outline"
                onChange={handleChange}
                value={initialForm.outline}
              ></TextField>
            </Grid>
            <Grid item sm={12}>
              <Typography variant="h6">Lectures:</Typography>
              <ul>
                {initialForm.subtitles.map((subtitle, index) => (
                  <li>
                    {subtitle.subtitle}, {subtitle.minutes} minutes,{" "}
                    <Link href={subtitle.videoUrl} underline="hover">
                      {subtitle.videoUrl}
                    </Link>{" "}
                  </li>
                ))}
              </ul>
              <Divider />
            </Grid>
            <Grid item sm={12} marginBottom={2}>
              <Typography variant="h6" sx={{ lineHeight: 1.5 }}>
                Exercises:
              </Typography>
              {initialForm.exercises.map((exercise, index) => (
                <>
                  <Typography sx={{ lineHeight: 1.5 }}>
                    {exercise.question}
                  </Typography>
                  <ul sx={{ lineHeight: 0.1 }}>
                    <li sx={{ lineHeight: 0.5 }}>
                      {exercise.answers[0].answer} (correct)
                    </li>
                    <li sx={{ lineHeight: 0.5 }}>
                      {exercise.answers[1].answer}
                    </li>
                    <li sx={{ lineHeight: 0.5 }}>
                      {exercise.answers[2].answer}
                    </li>
                    <li sx={{ lineHeight: 0.5 }}>
                      {exercise.answers[3].answer}
                    </li>
                  </ul>
                </>
              ))}
              <Divider />
            </Grid>
            <Grid item sm={3} display="flex" justifyContent="start" container>
              <IconButton onClick={handleAlertDialogue} color="error">
                <DeleteForeverIcon></DeleteForeverIcon>
              </IconButton>
            </Grid>

            <Grid item sm={9} display="flex" justifyContent="end" container>
              <Button onClick={OpenLectureModal}>Add Lecture</Button>
              <Button onClick={OpenQuizModal}>Add Exercise</Button>
              <Button
                onClick={submitSection}
                variant="contained"
                color="primary"
              >
                Submit Section
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </form>
  );
};

export default Section;
