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
} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import Input from "./Input";
import { signin, signup } from "../../actions/auth";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

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
  const [showError, setShowError] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeValues = (e) => {
    const val = e.target.value;
    const key = e.target.name;
    setForm({ ...form, [key]: val });
  };

  const handleSubmit = (e) => {
    setShowError((prev) => !prev);

    e.preventDefault();
    if (value == 0) dispatch(signup(form, history));
    else dispatch(signin(form, history));
  };
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
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
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Register" {...a11yProps(0)} />
          <Tab label="Sign in" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <div style={{ width: "500px" }}>
        <TabPanel value={value} index={0}>
          <form onSubmit={handleSubmit}>
            <Grid rowSpacing={3} container direction="column">
              <Input
                name="firstName"
                label="First Name"
                type="text"
                autoFocus={true}
                handleChangeValues={handleChangeValues}
              ></Input>

              <Input
                name="lastName"
                handleChangeValues={handleChangeValues}
                label="Last Name"
                type="text"
              ></Input>

              <Input
                handleChangeValues={handleChangeValues}
                name="email"
                label="Email"
                type="email"
              ></Input>

              <Input
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                handleChangeValues={handleChangeValues}
                handleShowPassword={handleShowPassword}
              ></Input>

              <Grid item sm={12}>
                <FormControlLabel
                  control={<Checkbox required />}
                  label="I agree on terms and conditions "
                />
              </Grid>
              <Grid item sm={12}>
                <Typography fontSize={12} s color="grey" variant="body2">
                  By creating an account, you agree to the Terms of Service and
                  Honor Codein a new tab and you acknowledge that edX and each
                  Member process your personal data in accordance with the
                  Privacy Policyin a new tab.
                </Typography>
              </Grid>
            </Grid>
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
      </div>

      <TabPanel value={value} index={1}>
        <form onSubmit={handleSubmit}>
          <Grid rowSpacing={3} container direction="column">
            <Input
              handleChangeValues={handleChangeValues}
              name="email"
              autoFocus={true}
              label="Email"
              type="email"
            ></Input>

            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              handleChangeValues={handleChangeValues}
              handleShowPassword={handleShowPassword}
            ></Input>
            {user?.message && (
              <FormHelperText sx={{ fontSize: 14 }} error>
                {user?.message}
              </FormHelperText>
            )}
            <Stack mt={3} columnGap={3} direction="row">
              <Button
                type="submit"
                size="large"
                color="error"
                variant="contained"
              >
                Sign in
              </Button>
              <Link
                underline="none"
                color="#00000"
                variant="text"
                style={{ alignSelf: "center" }}
              >
                Forget Password?
              </Link>
            </Stack>
          </Grid>
        </form>
      </TabPanel>
    </Box>
  );
}