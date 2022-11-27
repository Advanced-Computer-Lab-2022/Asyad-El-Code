import React, { useEffect, useState } from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
export const VideoAndExercise = ({ content, exercise }) => {
  const [value, setValue] = useState("");
  const [correct, setCorrect] = useState(false);
  const [show, setShow] = useState(false);
  const handleChange = (index) => {
    setValue(index);
  };

  const handleSubmit = (index) => {
    if (exercise[index].answers[value].correct === true) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
    setShow(true);
  };
  return (
    <div>
      {content.videoUrl !== "" ? (
        <>
          <Container>
            <Paper elevation={12}>
              <Typography variant="h4" sx={{ color: "#000000" }}>
                {content.subtitle}
              </Typography>
              <Typography variant="h6" sx={{ color: "#000000" }}>
                {content.description}
              </Typography>
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
          {" "}
          <Container>
            {exercise.map((ex, index) => {
              return (
                <>
                  <Paper elevation={12}>
                    <Typography variant="h4" sx={{ color: "#000000" }}>
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
                              onChange={() => handleChange(index)}
                            />
                          );
                        })}
                      </RadioGroup>

                      <Button
                        variant="contained"
                        onClick={() => handleSubmit(index)}
                      >
                        Submit
                      </Button>
                    </FormControl>

                    {show ? (
                      correct ? (
                        <Typography variant="h6" sx={{ color: "#000000" }}>
                          Correct
                        </Typography>
                      ) : (
                        <Typography variant="h6" sx={{ color: "#000000" }}>
                          Incorrect
                        </Typography>
                      )
                    ) : null}
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
