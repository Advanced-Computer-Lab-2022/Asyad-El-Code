import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import {
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Link,
  IconButton,
  InputAdornment,
  FormHelperText,
  Alert,
  AlertTitle,
  CircularProgress,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import Input from "./Input";
import { sendEmail, signin, signup } from "../../actions/auth";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function RegisterTabs() {
  const [value, setValue] = React.useState(0);
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [message, setMessage] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const { authData, error } = useSelector((state) => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeValues = (e) => {
    const val = e.target.value;
    const key = e.target.name;
    switch (key) {
      case "firstName":
        if (key === "firstName") setFirstNameError(false);
        break;
      case "lastName":
        if (key === "lastName") setLastNameError(false);
        break;
      case "email":
        if (key === "email") setEmailError(false);
        break;
      case "password":
        if (key === "password") setPasswordError(false);
        break;
      default:
        break;
    }

    setForm({ ...form, [key]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(error?.message ? error.message : null);

    if (form.firstName === "") setFirstNameError(true);
    else setFirstNameError(false);
    if (form.lastName === "") setLastNameError(true);
    else setLastNameError(false);
    if (form.email === "") setEmailError(true);
    else setEmailError(false);
    if (form.password === "") setPasswordError(true);
    else setPasswordError(false);

    if (form.firstName && form.lastName && form.email && form.password) {
      dispatch(signup(form, history));
    } else if (form.email && form.password) {
      setIsLoading(true);
      dispatch(signin(form, history, setIsLoading));
    }
  };
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  React.useEffect(() => {
    setForm(initialForm);

    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setMessage(null);
    //Clear the form
  }, [value]);
  const handleSendEmail = () => {
    if (form.email === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
      dispatch(sendEmail(form));
    }
    setMessageSent(true);
  };

  function parseJson() {
    try {
      return JSON.parse(localStorage.getItem("profile"));
    } catch (ex) {
      return "";
    }
  }
  const user = parseJson();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {isClicked ? (
          <Button onClick={() => setIsClicked(false)}>
            <ArrowBackIcon></ArrowBackIcon>
          </Button>
        ) : (
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Register" {...a11yProps(0)} />
            <Tab label="Sign in" {...a11yProps(1)} />
          </Tabs>
        )}
      </Box>
      <div style={{ width: "500px" }}>
        {isClicked ? (
          <>
            <Stack rowGap={1} mb={4} mt={2} direction="column">
              <Typography variant="h6">Reset Password</Typography>
              <Typography letterSpacing={2} color="#212323" fontSize={16}>
                Please enter your email address below and we will send you an
                email with instructions on how to reset your password.
              </Typography>
            </Stack>
            <Grid rowSpacing={3} container direction="column">
              <Grid item>
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  autoFocus={true}
                  handleChangeValues={handleChangeValues}
                  error={emailError}
                ></Input>
              </Grid>

              {messageSent && (
                <>
                  {" "}
                  <Alert
                    onClose={() => {
                      setMessageSent(false);
                    }}
                  >
                    This is a success alert — check it out!
                  </Alert>
                </>
              )}
              <Grid mt={2} item sm={12}>
                <Button
                  type="submit"
                  color="error"
                  variant="contained"
                  size="large"
                  onClick={handleSendEmail}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <TabPanel value={value} index={0}>
              <form onSubmit={handleSubmit}>
                <Grid rowSpacing={3} container direction="column">
                  <Input
                    name="firstName"
                    label="First Name"
                    type="text"
                    autoFocus={true}
                    handleChangeValues={handleChangeValues}
                    value={form.firstName}
                    error={firstNameError}
                  ></Input>

                  <Input
                    name="lastName"
                    handleChangeValues={handleChangeValues}
                    label="Last Name"
                    type="text"
                    value={form.lastName}
                    error={lastNameError}
                  ></Input>

                  <Input
                    handleChangeValues={handleChangeValues}
                    name="email"
                    label="Email"
                    type="email"
                    value={form.email}
                    error={emailError}
                  ></Input>

                  <Input
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    handleChangeValues={handleChangeValues}
                    handleShowPassword={handleShowPassword}
                    value={form.password}
                    error={passwordError}
                  ></Input>

                  <Grid item sm={12}>
                    <FormControlLabel
                      control={<Checkbox required />}
                      label="I agree on terms and conditions "
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <Typography fontSize={12} s color="grey" variant="body2">
                      By creating an account, you agree to the Terms of Service
                      and Honor Codein a new tab and you acknowledge that edX
                      and each Member process your personal data in accordance
                      with the Privacy Policyin a new tab.
                    </Typography>
                  </Grid>
                </Grid>
                s
                <Grid mt={3} item sm={12}>
                  <Button
                    type="submit"
                    color="error"
                    variant="contained"
                    size="large"
                  >
                    Create an Account for Free
                  </Button>
                </Grid>
              </form>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <form onSubmit={handleSubmit}>
                <Grid rowSpacing={3} container direction="column">
                  <Input
                    handleChangeValues={handleChangeValues}
                    name="email"
                    autoFocus={true}
                    label="Email"
                    type="email"
                    value={form.email}
                    error={emailError}
                  ></Input>

                  <Input
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    handleChangeValues={handleChangeValues}
                    handleShowPassword={handleShowPassword}
                    value={form.password}
                    error={passwordError}
                  ></Input>
                  {message && (
                    <FormHelperText sx={{ fontSize: 14 }} error>
                      {message}
                    </FormHelperText>
                  )}
                  <Stack mt={3} columnGap={3} direction="row">
                    <Button
                      type="submit"
                      size="large"
                      color="error"
                      variant="contained"
                    >
                      Sign in{"   "}
                      {isLoading && (
                        <>
                          <div style={{ width: "20px" }}></div>
                          <CircularProgress
                            size={20}
                            sx={{ color: "#fff" }}
                          ></CircularProgress>
                        </>
                      )}
                    </Button>

                    <Button
                      // color="#FFFFF"
                      sx={{ color: "#000000" }}
                      variant="text"
                      onClick={() => setIsClicked(true)}
                    >
                      Forget Password?
                    </Button>
                  </Stack>
                </Grid>
              </form>
            </TabPanel>
          </>
        )}
      </div>
    </Box>
  );
}
