import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function RequestAccess() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isOpen, setisOpen] = React.useState(false);
  const handleIsOpen = () => setisOpen(true);
  const handleIsClose = () => setisOpen(false);

  return (
    <Grid container spacing="2px">
      <Grid item xs={3}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Request Access
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Please state why you would like to take this course
            </Typography>
            <TextField
              id="outlined-multiline-static"
              label="Write your reason here"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            />
            <Box sx={{ display: "flex", placeContent: "space-evenly", mt: 2 }}>
              <Button variant="contained" color="primary">
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" color="primary" onClick={handleIsOpen}>
          Request Refund
        </Button>
        <Modal
          open={isOpen}
          onClose={handleIsClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              State below why you no longer want to continue with this course
            </Typography>
            <TextField
              id="outlined-multiline-static"
              label="Write your reason here"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            />
            <Box sx={{ display: "flex", placeContent: "space-evenly", mt: 2 }}>
              <Button variant="contained" color="primary">
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleIsClose}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Grid>
    </Grid>
  );
}
export default RequestAccess;
