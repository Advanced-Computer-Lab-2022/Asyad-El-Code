import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { CircularProgress } from "@mui/material";

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

function RequestAccess(props) {
  const [message, setMessage] = React.useState("");
  const handleSubmit = () => {
    props.handleSubmit(message);
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
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
          value={message}
          onChange={handleChange}
        />
        <Box sx={{ display: "flex", placeContent: "space-evenly", mt: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={props.handleClose}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit{" "}
            {props.isLoading && (
              <CircularProgress
                sx={{ color: "white", marginLeft: "10px" }}
                size={20}
              />
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default RequestAccess;
