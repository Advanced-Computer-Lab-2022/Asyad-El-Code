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
import { RatingAndReviewPopup } from "./RatingAndReviewPopup";
import { addRating, addReview, getCourse } from "../../actions/courses.js";
import courseImage from "../../images/point.png";
import { getTrainee } from "../../actions/individualTrainees.js";
import * as individualTraineeApi from "../../api/individualTrainees.js";

const contentInitialForm = {
  subtitle: "",
  minutes: 0,
  videoUrl: "",
};
const exerciseInitialForm = [
  { question: "", answers: [{ answer: "", correct: false }] },
];

export const CourseContent = () => {
  function parseJson() {
    try {
      return JSON.parse(localStorage.getItem("profile"));
    } catch (ex) {
      return "";
    }
  }
  const user = parseJson();

  const [content, setContent] = useState(contentInitialForm);
  const [exercise, setExercise] = useState(exerciseInitialForm);
  const [exerciseId, setExerciseId] = useState("");
  const [ratingOpen, setRatingOpen] = useState(false);
  const [userObject, setUserObject] = useState({});
  const dispatch = useDispatch();

  const getIndividualTrainee = async () => {
    const data = await individualTraineeApi.getTrainee(user.result._id);
    setUserObject(data);
  };
  useEffect(() => {
    getIndividualTrainee();
  }, []);

  console.log("I am user Object", userObject);
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
  console.log(user);

  const { courses } = useSelector((state) => state.courses);
  const course = courses[0];

  console.log("Iam in CONTENT COURSEE MAAAN", course);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleClick = (subtitle) => {
    setContent(subtitle);
    setExercise(exerciseInitialForm);
  };

  const handleClickEx = (exercise, exerciseId) => {
    setExercise(exercise);
    setExerciseId(exerciseId);
    setContent(contentInitialForm);
  };
  const handleCancelRating = () => {
    setRatingOpen(false);
  };
  const handleSubmitRatingAndReview = (rating, review) => {
    if (user.type === "individualTrainee") {
      dispatch(addRating(course?._id, "", user.result._id, rating));
      dispatch(addReview(course?._id, "", user.result._id, review));
    } else {
      dispatch(addRating(course?._id, user.result._id, "", rating));
      dispatch(addReview(course?._id, user.result._id, "", review));
    }

    setRatingOpen(false);
  };
  const handleHome = () => {
    dispatch(getCourse(course._id, history, course?.title));
  };
  //in line 212 check if the user (individualTrainee) has already answered an exercise and if so show the grade as score/total
  return (
    <div>
      <RatingAndReviewPopup
        ratingOpen={ratingOpen}
        handleCancelRating={handleCancelRating}
        handleSubmit={handleSubmitRatingAndReview}
      ></RatingAndReviewPopup>
      <Grid container marginTop={3}>
        <Grid item xs={3}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Paper elevation={12} className={classes.paper}>
                <Grid container>
                  <Grid iten xs={12}>
                    <img src={courseImage} alt="Course Image" width="100%" />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.courseTitle}>
                      {course?.title}
                    </Typography>
                  </Grid>
                  <ThemeProvider theme={theme}>
                    <Grid item xs={6}>
                      <IconButton onClick={handleHome}>
                        <HomeSharpIcon
                          fontSize="large"
                          color="primary"
                        ></HomeSharpIcon>
                      </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton onClick={() => setRatingOpen(true)}>
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
              {course?.outlines.map((outline, index) => {
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
                      <Typography sx={{ marginRight: "30px" }}>
                        {outline?.outline}
                      </Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {`(${outline?.totalHours} hours)`}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        {outline?.subtitles.map((subtitle) => {
                          return (
                            <ListItem
                              key={subtitle}
                              onClick={() => handleClick(subtitle)}
                            >
                              <ListItemIcon>
                                <OndemandVideoIcon />
                              </ListItemIcon>
                              <ListItemText>{`${subtitle.subtitle}   (${subtitle.minutes} minutes)`}</ListItemText>
                            </ListItem>
                          );
                        })}

                        {outline?.exercises[0] && (
                          <ListItem
                            button
                            onClick={() =>
                              handleClickEx(outline.exercises, outline._id)
                            }
                          >
                            <ListItemIcon>
                              <QuizIcon />
                            </ListItemIcon>

                            <ListItemText>
                              {/* {`Exercise ${
                                userObject?.courses
                                  .filter((c) => c._id === course._id)[0]
                                  .grades.filter(
                                    (g) => (g._id = outline._id)
                                  )[0].score
                              }`} */}
                              {/* {`Exercise ${userObject?.courses[0].grades[0].score}/${userObject?.courses[0].grades[0].total}`} */}
                            </ListItemText>
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
          {content.videoUrl || exercise[0].question ? (
            <>
              <Grid container direction="column">
                <Grid item>
                  <VideoAndExercise
                    content={content}
                    exercise={exercise}
                    exerciseId={exerciseId}
                    courseId={course?._id}
                    user={userObject}
                  ></VideoAndExercise>
                </Grid>
              </Grid>
            </>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};
