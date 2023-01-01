import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AdminDashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        className={classes.modal}
      >
        <div className={classes.paper}>
          <h2 id="simple-modal-title">Registration Form</h2>
          <p id="simple-modal-description">
            Please enter your first name, last name, new password, and confirm password.
          </p>
          <form noValidate>
            <FormControl>
              <TextField
                label="First Name"
                id="first-name"
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Last Name"
                id="last-name"
                variant="outlined"
                fullWidth
              />
              <TextField
                label="New Password"
                id="new-password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Confirm Password"
                id="confirm-password"
                type="password"
                variant="outlined"
                fullWidth
              />
            </FormControl>
          </form>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Submit
          </Button>
        </div>
      </Modal>
  );
}
