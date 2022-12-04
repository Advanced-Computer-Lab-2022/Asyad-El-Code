
import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, TextField } from "@mui/material";
import { useState } from "react";




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const initialFormState = {
  question: "",
  answers: [
    {
      answer: "",
      correct: false,
    },
  ],
};
export default function Exercise({
  open,
  submitContent,
  handleClose,
}) {
  const [initialForm, setInitialForm] = useState(initialFormState);
  const [answerArray, setAnswerArray] = useState(["", "", "", ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answers = [
      { answer: answerArray[0], correct: true },
      { answer: answerArray[1], correct: false },
      { answer: answerArray[2], correct: false },
      { answer: answerArray[3], correct: false },
    ];
    submitContent({ ...initialForm, answers: answers }, "exercises");
    //reset initialForm
    setInitialForm(initialFormState, setAnswerArray(["", "", "", ""]));
    handleClose();
  };

  const handleChange = (e) => {
    const val = e.target.value;
    const key = e.target.name;
    setInitialForm({ ...initialForm, [key]: val });
  };

  const handle2Change = (e) => {
    if (e.target.name === "answer1") {
      setAnswerArray((prev) => {
        prev[0] = e.target.value;
        return [...prev];
      });
    } else if (e.target.name === "answer2") {
      setAnswerArray((prev) => {
        prev[1] = e.target.value;
        return [...prev];
      });
    } else if (e.target.name === "answer3") {
      setAnswerArray((prev) => {
        prev[2] = e.target.value;
        return [...prev];
      });
    } else {
      setAnswerArray((prev) => {
        prev[3] = e.target.value;
        return [...prev];
      });
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add Exercise
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit} autoComplete="off">
            <Grid
              Grid
              container
              spacing={5}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item sm={3}>
                <p>Question:</p>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  required
                  id="Question Name"
                  name="question"
                  label="question"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={3}>
                <p>1st Answer (correct)</p>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  required
                  id="answer1"
                  name="answer1"
                  label="Answer 1"
                  fullWidth
                  variant="outlined"
                  onChange={handle2Change}
                />
              </Grid>

              <Grid item sm={3}>
                <p>2nd Answer</p>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  required
                  id="answer2"
                  name="answer2"
                  label="Answer 2"
                  fullWidth
                  variant="outlined"
                  onChange={handle2Change}
                />
              </Grid>
              <Grid item sm={3}>
                <p>3rd Answer</p>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  required
                  id="answer3"
                  name="answer3"
                  label="Answer 3"
                  fullWidth
                  variant="outlined"
                  onChange={handle2Change}
                />
              </Grid>
              <Grid item sm={3}>
                <p>4th Answer</p>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  required
                  id="answer4"
                  name="answer4"
                  label="Answer 4"
                  fullWidth
                  variant="outlined"
                  onChange={handle2Change}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            type="submit"
            autoFocus
            // onClick={() => submitLecture(initialForm)}
            onClick={handleSubmit}
          >
            Add Exercise
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

