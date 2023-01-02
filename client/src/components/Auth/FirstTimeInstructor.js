import {
    Tab,
    Fab,
    Tabs,
    Box,
    AppBar,
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
    Dialog,
    DialogActions,
    MenuItem,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Select,
    InputAdornment,
    FormHelperText

} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blue } from "@mui/material/colors";
import { reportProblem } from "../../actions/reportedProblems";
import { useHistory } from "react-router-dom";
import { firstTimeInstructor } from "../../actions/auth";


export default function FirstTimeInstrucor({ instructorModal, handleClose }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [match, setMatch] = useState(true);

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }
    const handleGenderChange = (e) => {
        setGender(e.target.value);
    }
    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };


    const handleSubmit = (e) => {
        // const problem = {
        //     reporterEmail: props?.reporterEmail,
        //     courseId: props?.course._id,
        //     courseName: props?.course.title,
        //     type: type,
        //     details: details,
        // };
        // dispatch(reportProblem(problem));
        // handleClose();
        e.preventDefault();
        if (password !== confirmPassword) {
            setMatch(false);
        } else {
            setMatch(true);
            const userId = JSON.parse(localStorage.getItem("profile")).result?._id;
            const formData = {
                firstName: firstName,
                lastName: lastName,
                password: password,
                gender: gender,
                country: country
            }
            dispatch(firstTimeInstructor(formData, userId, history));
            handleClose();
        }
    };

    return (
        <Dialog
            open={instructorModal}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle margin={1} id="form-dialog-title">
                WELCOME ON BOARD!
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3} padding={1}>
                    <Grid item xs={12}>
                        <DialogContentText padding={1}>
                            Please fill in the following details to complete your registration
                        </DialogContentText>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="details"
                            label="First Name"
                            type="text"
                            fullWidth
                            value={firstName}
                            onChange={handleFirstNameChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="details"
                            label="Last Name"
                            type="text"
                            fullWidth
                            value={lastName}
                            onChange={handleLastNameChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="details"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            InputProps={{
                                endAdornment:
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
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="details"
                            label="Confirm Password"
                            type={showPassword2 ? "text" : "password"}
                            fullWidth
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword2}
                                            onMouseDown={handleMouseDownPassword2}
                                            edge="end"
                                        >
                                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />
                        {!match ? (
                            <FormHelperText error id="accountId-error">
                                Passwords do not match
                            </FormHelperText>
                        ) : null}
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="details"
                            label="Country"
                            type="text"
                            fullWidth
                            value={country}
                            onChange={handleCountryChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth sx={{ marginTop: 1 }}>
                            <InputLabel id="type-select-label">Gender</InputLabel>
                            <Select
                                labelId="type-select-label"
                                id="type-select"
                                value={gender}
                                onChange={handleGenderChange}
                                label="Gender"
                                required
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <DialogContentText padding={1}>
                            By clicking submit, you agree to our <a href="#sadsd">Terms of Service and Privacy Policy</a>
                        </DialogContentText>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    sx={{
                        "&:hover": { backgroundColor: "#FAF9F6" },
                        backgroundColor: "#FFFFFF",
                        color: "#2F2B2E",
                        fontWeight: "bold",
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    sx={{
                        "&:hover": { backgroundColor: "#FAF9F6" },
                        backgroundColor: "#FFFFFF",
                        color: "#2F2B2E",
                        fontWeight: "bold",
                    }}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
