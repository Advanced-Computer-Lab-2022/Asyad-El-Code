import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Grid, Rating, TextField, Typography } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RatingCourse({ isOpen, handleClose }) {
  const [rate, setRate] = React.useState(0);
  return (
    <div>
      <Dialog
        fullWidth
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle alignSelf="center">{"Rate The Course"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              textAlignLast: "center",
            }}
            id="alert-dialog-slide-description"
          >
            <Rating
              sx={{
                textAlignLast: "center",
                fontSize: 50,
                alignSelf: "center",
              }}
              size="large"
              onChange={(e) => {
                setRate(e.target.value);
              }}
            ></Rating>
            {rate && (
              <Grid container>
                <Grid item xs={12}>
                  Add Review
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={{ width: 500 }}
                    multiline
                    color="grey"
                    rows={6}
                    label="Tell us about your own personal experience taking this course"
                  ></TextField>
                </Grid>
              </Grid>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={handleClose}>
            Save And Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
