import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Fab,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import useStyles from "../../../css/courseContent.js";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import * as individualTraineeApi from "../../../api/individualTrainees.js";
import ReactPlayer from "react-player";
import CreateIcon from "@mui/icons-material/Create";
import Notes from "./Notes.js";

export const VideoAndExercise = ({
  content,
  exercise,
  exerciseId,
  courseId,
  user,
  videoOpen,
  exerciseOpen,
}) => {
  const [value, setValue] = useState(new Map());
  const [correct, setCorrect] = useState(new Map());
  const [show, setShow] = useState(new Map());
  const [grade, setGrade] = useState(0);
  const [total, setTotal] = useState(0);
  const [showGrade, setShowGrade] = useState(false);
  const [playedMinutes, setPlayedMinutes] = useState(0);

  const { classes } = useStyles();

  const handleChange = (index, ind) => {
    setValue((prev) => new Map(prev).set(ind, index));
  };

  const handleSubmit = (index) => {
    if (exercise[index].answers[value.get(index)].correct === true) {
      setCorrect((prev) => new Map(prev).set(index, true));
      setShow((prev) => new Map(prev).set(index, true));
      setGrade((prev) => prev + 1);
    } else {
      setCorrect((prev) => new Map(prev).set(index, false));
      setShow((prev) => new Map(prev).set(index, true));
    }
  };

  useEffect(() => {
    setTotal(exercise.length);
  }, [exercise]);
  useEffect(() => {
    setTotal(exercise.length);
  }, []);
  const addGrade = async () => {
    const { data } = await individualTraineeApi.addGrade(
      user._id,
      courseId,
      exerciseId,
      grade,
      total
    );
  };
  useEffect(() => {
    if (correct.size === total && total !== 0) {
      setShowGrade(true);
      addGrade();
    }
  }, [correct, total]);

  useEffect(() => {
    if (content.videoUrl !== "") {
      setValue(new Map());
      setCorrect(new Map());
      setShow(new Map());
      setGrade(0);
      setTotal(0);
      setShowGrade(false);
    }
  }, [content.videoUrl]);

  useEffect(() => {
    setValue(new Map());
    setCorrect(new Map());
    setShow(new Map());
    setGrade(0);
    // setTotal(0);
    setShowGrade(false);
  }, [exerciseId]);

  console.log("This is the current exefcise id", exerciseId);
  console.log("THE CONTENT IS ", content);

  return (
    <div>
      {videoOpen ? (
        <>
          <Container>
            <Paper elevation={12} className={classes.videoPaper}>
              <Typography variant="h3">{content.subtitle}</Typography>
              <ReactPlayer
                width="100%"
                onProgress={(state) => {
                  setPlayedMinutes((state.playedSeconds / 60).toFixed(2) - 0.1);
                }}
                url={`https://www.youtube.com/embed/${content.videoUrl}`}
                height="500px"
                controls={true}
              ></ReactPlayer>
            </Paper>
          </Container>

          <Notes
            courseId={courseId}
            lectureId={content._id}
            playedMinutes={playedMinutes}
            userId={user?._id}
            content={content}
          ></Notes>
        </>
      ) : null}
      {exerciseOpen ? (
        <>
          {showGrade ? (
            <Container>
              <Paper elevation={12} className={classes.exercisePaper}>
                <Typography variant="h4" sx={{ color: "#000000" }}>
                  You Scored {content._id}
                </Typography>
                <Typography variant="h6" sx={{ color: "#000000" }}>
                  {grade}/{total}
                </Typography>
              </Paper>
            </Container>
          ) : null}{" "}
          <Container>
            {exercise?.map((ex, ind) => {
              return (
                <>
                  <Paper elevation={12} className={classes.exercisePaper}>
                    <Typography variant="h6" sx={{ color: "grey" }}>
                      {`Question ${ind + 1} of ${total}`}
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#000000" }}>
                      {ex.question}
                    </Typography>

                    <FormControl component="fieldset">
                      <FormLabel component="legend" id="quiz">
                        Select one correct answer
                      </FormLabel>

                      {show.get(ind) ? (
                        <>
                          {ex.answers.map((ans, index) => {
                            return (
                              <>
                                {ans.correct ? (
                                  // check icon for correct answer without radio control and with green color
                                  <FormControlLabel
                                    value={index}
                                    control={
                                      <CheckCircleOutlineOutlinedIcon
                                        sx={{ color: "#00FF00" }}
                                      />
                                    }
                                    label={ans.answer}
                                    labelPlacement="end"
                                  />
                                ) : (
                                  // // cross icon for wrong answer without radio control and with red color
                                  <FormControlLabel
                                    value={index}
                                    control={
                                      <HighlightOffOutlinedIcon
                                        sx={{ color: "#FF0000" }}
                                      />
                                    }
                                    label={ans.answer}
                                    labelPlacement="end"
                                  />
                                )}
                              </>
                            );
                          })}
                          {correct.get(ind) ? (
                            <Typography variant="h6" sx={{ color: "#00FF00" }}>
                              Correct
                            </Typography>
                          ) : (
                            <Typography variant="h6" sx={{ color: "#FF0000" }}>
                              Incorrect
                            </Typography>
                          )}
                        </>
                      ) : (
                        <>
                          <RadioGroup aria-labelledby="quiz" name="quiz">
                            {ex.answers.map((answer, index) => {
                              return (
                                <FormControlLabel
                                  value={answer.answer}
                                  control={<Radio />}
                                  label={answer.answer}
                                  key={index}
                                  onChange={() => handleChange(index, ind)}
                                />
                              );
                            })}
                          </RadioGroup>
                          <Button
                            variant="contained"
                            onClick={() => handleSubmit(ind)}
                          >
                            Submit
                          </Button>
                        </>
                      )}
                    </FormControl>
                  </Paper>
                </>
              );
            })}
          </Container>
        </>
      ) : null}
    </div>
  );
};