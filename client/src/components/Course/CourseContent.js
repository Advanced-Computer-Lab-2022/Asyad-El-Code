import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import { Grid, ListItemIcon, Paper } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import QuizIcon from "@mui/icons-material/Quiz";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { getCourseData } from "../../actions/courses";
import { VideoAndExercise } from "./VideoAndExercise";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
const contentInitialForm = {
  subtitle: "",
  minutes: 0,
  videoUrl: "",
};
const exerciseInitialForm = [
  { question: "", answers: [{ answer: "", correct: false }] },
];
export const CourseContent = () => {
  const [content, setContent] = useState(contentInitialForm);
  const [exercise, setExercise] = useState(exerciseInitialForm);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourseData());
  }, []);
  const courses = useSelector((c) => c.courses);
  const index = courses.length - 1;
  const course = courses[index];

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleClick = (subtitle) => {
    setContent(subtitle);
    setExercise(exerciseInitialForm);
  };

  const handleClickEx = (exercise) => {
    setExercise(exercise);
    setContent(contentInitialForm);
  };
  return (
    <div>
      <Grid container marginTop={3}>
        <Grid item xs={3}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Paper elevation={12} sx={{ backgroundColor: "#000000" }}>
                <Typography sx={{ color: "#FFFFFF" }}>
                  {course.title}
                </Typography>
              </Paper>
            </Grid>
            <Grid item>
              {course.outlines.map((outline, index) => {
                return (
                  <Accordion
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                    key={index}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        {outline.outline}
                      </Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {outline.totalHours}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        {outline.subtitles.map((subtitle) => {
                          return (
                            <ListItem
                              button
                              key={subtitle}
                              onClick={() => handleClick(subtitle)}
                            >
                              <ListItemIcon>
                                <OndemandVideoIcon />
                              </ListItemIcon>
                              <ListItemText>{subtitle.subtitle}</ListItemText>
                            </ListItem>
                          );
                        })}
                        {outline.exercise && (
                          <ListItem
                            button
                            onClick={() => handleClickEx(outline.exercise)}
                          >
                            <ListItemIcon>
                              <QuizIcon />
                            </ListItemIcon>

                            <ListItemText>Exercise</ListItemText>
                          </ListItem>
                        )}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Grid container direction="column">
            <Grid item>
              <VideoAndExercise
                content={content}
                exercise={exercise}
              ></VideoAndExercise>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
