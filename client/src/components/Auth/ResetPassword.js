import {
  Button,
  Grid,
  IconButton,
  Box,
  TextField,
  Typography,
  Stack,
  Alert,
  AlertTitle,
} from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Input from "./Input";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePasword } from "../../actions/auth";
const initialForm = {
  password: "",
  confirmPassword: "",
};
export const ResetPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [form, setForm] = React.useState(initialForm);
  const [error, setError] = React.useState(false);
  const history = useHistory();
  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const message = useSelector((state) => state.authReducer);
  console.log("MESSAGE ", message?.authData?.message);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleChangeValues = (e) => {
    if (e.target.name === "password") setPasswordError(false);
    else setConfirmPasswordError(false);

    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    if (form.password == "") {
      setPasswordError(true);
    }
    if (form.confirmPassword == "") {
      setConfirmPasswordError(true);
    } else {
      if (form.password !== form.confirmPassword) {
        setError(true);
        return;
      } else {
        dispatch(changePasword(form, id));
      }
    }

    console.log(form);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Button
          onClick={() => history.push("/auth")}
          startIcon={<ArrowBackIcon />}
        >
          Sign in
        </Button>
      </Box>
      <div style={{ width: "500px" }}>
        <form onSubmit={handleSubmit}>
          <Stack rowGap={1} mb={4} mt={2} direction="column">
            <Typography variant="h6">Reset Password</Typography>
            <Typography letterSpacing={2} color="#212323" fontSize={16}>
              Enter and confirm your new password.
            </Typography>
          </Stack>
          <Grid rowSpacing={3} container direction="column">
            <Input
              name="password"
              autoFocus={true}
              label="New Password"
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              handleChangeValues={handleChangeValues}
              error={passwordError}
              value={form.password}
            ></Input>

            <Input
              name="confirmPassword"
              autoFocus={true}
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              handleChangeValues={handleChangeValues}
              error={confirmPasswordError}
              value={form.confirmPassword}
            ></Input>
            {error && (
              <Typography color="error" variant="body2">
                Passwords don't match
              </Typography>
            )}
            {message?.authData?.message && (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Your password changed succesfully —{" "}
                <strong>check it out!</strong>
              </Alert>
            )}
            <Grid mt={2} item sm={12}>
              <Button
                type="submit"
                color="error"
                variant="contained"
                size="large"
              >
                Reset Password
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Box>
  );
};
