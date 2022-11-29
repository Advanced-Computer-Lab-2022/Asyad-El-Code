import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import {
  Grid,
  IconButton,
  Link,
  ListItemIcon,
  Paper,
  ThemeProvider,
} from "@mui/material";
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
import useStyles from "../../css/courseContent.js";
import StarHalfTwoToneIcon from "@mui/icons-material/StarHalfTwoTone";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import createTheme from "@mui/material/styles/createTheme";
import { useHistory } from "react-router-dom";
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
  const { classes } = useStyles();
  const history = useHistory();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
      },
      warning: {
        main: "#FFD700",
      },
    },
  });

  useEffect(() => {
    dispatch(getCourseData());
  }, []);
  const course = useSelector((c) => c.courses)[0];
  console.log(course);
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
              <Paper elevation={12} className={classes.paper}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography className={classes.courseTitle}>
                      {course.title}
                    </Typography>
                  </Grid>
                  <ThemeProvider theme={theme}>
                    <Grid item xs={6}>
                      <IconButton onClick={() => history.push("/viewAll")}>
                        <HomeSharpIcon
                          fontSize="large"
                          color="primary"
                        ></HomeSharpIcon>
                      </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton onClick={() => history.push("/viewAll")}>
                        <StarHalfTwoToneIcon
                          fontSize="large"
                          color="warning"
                        ></StarHalfTwoToneIcon>
                      </IconButton>
                    </Grid>
                  </ThemeProvider>
                </Grid>
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
                      sx={{ backgroundColor: "#EBF1F2" }}
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