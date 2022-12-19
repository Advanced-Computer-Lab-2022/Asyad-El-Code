import {
  Grid,
  Container,
  Typography,
  Paper,
  Modal,
  FormControl,
  form,
  OutlinedInput,
  Input,
  InputLabel,
  FormGroup,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Select,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
//import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getTrainee } from "../../actions/individualTrainees";
import { updateTrainee } from "../../actions/individualTrainees";

const Payments = () => {
  const trainee = useSelector((t) => t.individualTrainee);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(trainee.firstName);
  const [lastName, setLastName] = useState(trainee.lastName);
  const [password, setPassword] = useState(trainee.password);
  const [phone, setPhone] = useState(trainee.phoneNumber);
  const [country, setCountry] = useState(trainee.country);
  const [date, setDate] = useState(trainee.dateOfBirth);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  console.log(trainee);
  const handleForm = (e) => {
    e.preventDefault();
    trainee.firstName = firstName;
    trainee.lastName = lastName;
    trainee.password = password;
    trainee.phoneNumber = phone;
    trainee.country = country;
    dispatch(updateTrainee(trainee._id, trainee));
    console.log(trainee);
  };

  useEffect(() => {
    dispatch(getTrainee());
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignContent="center"
      color="#1C1D1F"
    >
      <Grid item borderBottom={1} borderColor="silver" width="100%" padding={3}>
        <Typography fontWeight="bold" fontSize={35} textAlign="center">
          Payments
        </Typography>
        <Typography fontSize={20} textAlign="center">
          Add your payment information
        </Typography>
      </Grid>
      {/* <Grid item borderBottom={1} borderColor="silver" width="100%" padding={3}>
                <form onSubmit={handleForm}>

                    <FormGroup sx={{ marginTop: '20px' }}>
                        <Grid container alignItems="center" justifyItems="center" columnSpacing={4} rowSpacing={5}>
                            <Grid item xs={5}>
                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        id="firstName"
                                        name="firstName"
                                        label="First name"
                                        fullWidth
                                        variant="outlined"
                                        defaultValue={firstName}
                                        onChange={(newValue) => {
                                            setFirstName(newValue.target.value)
                                            console.log(newValue.target.value)
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl variant="outlined" margin='10' fullWidth>
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lastName"
                                        label="Last name"
                                        fullWidth
                                        variant="outlined"
                                        defaultValue={lastName}
                                        onChange={(newValue) => {
                                            setLastName(newValue.target.value)
                                            console.log(newValue.target.value)
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item></Grid>
                            <Grid item xs={5}>
                                <FormControl variant="outlined" margin='10' fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        defaultValue={password}
                                        onChange={(newValue) => {
                                            setPassword(newValue.target.value)
                                            console.log(newValue.target.value)
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl variant="outlined" margin='10' fullWidth>
                                    <TextField
                                        id="counrty"
                                        name="country"
                                        label="Country"
                                        fullWidth
                                        variant="outlined"
                                        defaultValue={country}
                                        onChange={(newValue) => {
                                            setCountry(newValue.target.value)
                                            console.log(newValue.target.value)
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item></Grid>
                            <Grid item xs={5}>
                                <FormControl variant="outlined" margin='10' fullWidth>
                                    <TextField
                                        id="phone"
                                        name="phone"
                                        label="Phone"
                                        fullWidth
                                        variant="outlined"
                                        required
                                        defaultValue={phone}
                                        onChange={(newValue) => {
                                            setPhone(newValue.target.value);
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Date of birth"
                                        inputFormat='DD/MM/YYYY'
                                        value={date}
                                        // onChange={(newValue) => {
                                        //     console.log(date)
                                        //     console.log(newValue)
                                        //     setDate(newValue);
                                        // }}
                                        renderInput={(params) => <TextField {...params} name="dateOfBirth" fullWidth />}
                                    />
                                </LocalizationProvider>

                            </Grid>
                            <Grid item xs={10}>
                                <FormControl variant="outlined" margin='10' fullWidth>
                                    <TextField
                                        id="address"
                                        name="address"
                                        label="Address"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={3} alignItems="center" justifyItems="center">
                                <Button type="submit" fullWidth style={{ color: '#ffffff', background: '#80b918', marginTop: '20px' }}>
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </FormGroup>
                </form>
            </Grid> */}
    </Grid>
  );
};

export default Payments;
