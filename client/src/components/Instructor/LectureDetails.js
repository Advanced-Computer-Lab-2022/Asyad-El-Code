
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
  subtitle: "",
  minutes: "",
  videoUrl: "",
};
export default function LectureDetails({
  open,
  submitContent,
  handleClose,
}) {
  const [initialForm, setInitialForm] = useState(initialFormState);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const val = e.target.value;
    const key = e.target.name;
    setInitialForm({ ...initialForm, [key]: val });
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
          Add Lecture
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
                <p>Lecture Title:</p>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  required
                  id="subtitle"
                  name="subtitle"
                  label="subtitle"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={3}>
                <p>Total Hours:</p>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  required
                  id="minutes"
                  name="minutes"
                  label="minutes"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item sm={3}>
                <p>Video URL</p>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  required
                  id="video"
                  name="videoUrl"
                  label="Video Link"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
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
            onClick={() => {submitContent(initialForm, "subtitles"); handleClose(); setInitialForm(initialFormState);}}
          >
            Add
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

