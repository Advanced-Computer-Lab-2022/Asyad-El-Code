import React, { useEffect, useState } from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import useStyles from "../../css/courseContent.js";
export const VideoAndExercise = ({ content, exercise }) => {
  const [value, setValue] = useState(new Map());
  const [correct, setCorrect] = useState(new Map());
  const [show, setShow] = useState(new Map());
  const [grade, setGrade] = useState(0);
  const [total, setTotal] = useState(0);
  const [showGrade, setShowGrade] = useState(false);
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
    if (correct.size === total && total !== 0) {
      setShowGrade(true);
    }
  }, [correct, total]);

  return (
    <div>
      {content.videoUrl !== "" ? (
        <>
          <Container>
            <Paper elevation={12} className={classes.videoPaper}>
              <Typography variant="h3">{content.subtitle}</Typography>

              <iframe
                width="100%"
                height="500"
                src={content.videoUrl}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </Paper>
          </Container>
        </>
      ) : (
        <>
          {showGrade ? (
            <Container>
              <Paper elevation={12} className={classes.exercisePaper}>
                <Typography variant="h4" sx={{ color: "#000000" }}>
                  You Scored
                </Typography>
                <Typography variant="h6" sx={{ color: "#000000" }}>
                  {grade}/{total}
                </Typography>
              </Paper>
            </Container>
          ) : null}{" "}
          <Container>
            {exercise.map((ex, ind) => {
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

                      {show.get(ind) ? (
                        correct.get(ind) ? (
                          <Typography variant="h6" sx={{ color: "#00FF00" }}>
                            Correct
                          </Typography>
                        ) : (
                          <Typography variant="h6" sx={{ color: "#FF0000" }}>
                            Incorrect
                          </Typography>
                        )
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() => handleSubmit(ind)}
                        >
                          Submit
                        </Button>
                      )}
                    </FormControl>
                  </Paper>
                </>
              );
            })}
          </Container>
        </>
      )}
    </div>
  );
};
