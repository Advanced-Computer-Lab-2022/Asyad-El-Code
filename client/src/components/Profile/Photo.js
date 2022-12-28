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

const Photo = () => {
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
          Profile picture
        </Typography>
        <Typography fontSize={20} textAlign="center">
          Update your photo
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Photo;
