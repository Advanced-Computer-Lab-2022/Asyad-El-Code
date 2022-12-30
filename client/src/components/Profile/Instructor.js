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
    Alert
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTrainee } from "../../actions/individualTrainees";
import { updateInstructor } from "../../actions/instructor";

const Instructor = ({ instructor }) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(instructor?.firstName);
    const [lastName, setLastName] = useState(instructor?.lastName);
    const [phone, setPhone] = useState(instructor?.phoneNumber);
    const [country, setCountry] = useState(instructor?.country);
    const [email, setEmail] = useState(instructor?.email);
    const [biography, setBiography] = useState(instructor?.biography);
    const [isUpdated, setIsUpdated] = useState(false);

    console.log("in the instructor profile page", instructor);


    const handleForm = (e) => {
        e.preventDefault();
        //   trainee.firstName = firstName;
        //   trainee.lastName = lastName;
        //   trainee.password = password;
        //   trainee.phoneNumber = phone;
        //   trainee.country = country;
        //   dispatch(updateTrainee(trainee._id, trainee));
        //   console.log(trainee);
        instructor.firstName = firstName;
        instructor.lastName = lastName;
        instructor.phoneNumber = phone;
        instructor.country = country;
        instructor.biography = biography;
        console.log(instructor);
        dispatch(updateInstructor(instructor._id, instructor));
        setIsUpdated(true);
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignContent="center"
        >
            <Grid
                item
                borderBottom={1}
                borderColor="silver"
                width="100%"
                padding={3}
                bgcolor="#1C1D1F"
                color="white"
            >
                <Typography fontWeight="bold" fontSize={35} textAlign="center">
                    Public profile
                </Typography>
                <Typography fontSize={20} textAlign="center">
                    Add information about yourself
                </Typography>
            </Grid>
            <Grid item borderBottom={1} borderColor="silver" width="100%" padding={3}>
                <form onSubmit={handleForm}>
                    <FormGroup sx={{ marginTop: "20px" }}>
                        <Grid
                            container
                            alignItems="center"
                            justifyItems="center"
                            columnSpacing={4}
                            rowSpacing={5}
                        >
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
                                            setFirstName(newValue.target.value);
                                            console.log(newValue.target.value);
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl variant="outlined" margin="10" fullWidth>
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lastName"
                                        label="Last name"
                                        fullWidth
                                        variant="outlined"
                                        defaultValue={lastName}
                                        onChange={(newValue) => {
                                            setLastName(newValue.target.value);
                                            console.log(newValue.target.value);
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item></Grid>
                            <Grid item xs={5}>
                                <FormControl variant="outlined" margin="10" fullWidth>
                                    <TextField
                                        id="counrty"
                                        name="country"
                                        label="Country"
                                        fullWidth
                                        variant="outlined"
                                        defaultValue={country}
                                        onChange={(newValue) => {
                                            setCountry(newValue.target.value);
                                            console.log(newValue.target.value);
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl variant="outlined" margin="10" fullWidth>
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
                                <FormControl variant="outlined" margin="10" fullWidth>
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        fullWidth
                                        variant="outlined"
                                        defaultValue={email}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl variant="outlined" margin="10" fullWidth>
                                    <TextField
                                        id="biography"
                                        name="biography"
                                        label="Biography"
                                        fullWidth
                                        variant="outlined"
                                        defaultValue={biography}
                                        onChange={(newValue) => {
                                            setBiography(newValue.target.value);
                                            console.log(newValue.target.value);
                                        }}
                                        rows={4}
                                        multiline
                                    />
                                </FormControl>
                            </Grid>
                            {isUpdated && (
                                <Grid item xs={12}>
                                    <Alert severity="success">
                                        Your profile has been updated successfully
                                    </Alert>
                                </Grid>
                            )}
                            <Grid item xs={4}></Grid>
                            <Grid item xs={3} alignItems="center" justifyItems="center">
                                <Button
                                    type="submit"
                                    fullWidth
                                    style={{
                                        color: "#ffffff",
                                        background: "#80b918",
                                        marginTop: "20px",
                                    }}
                                >
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </FormGroup>
                </form>
            </Grid>
        </Grid>
    );
};

export default Instructor;
