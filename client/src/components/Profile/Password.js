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
    FormHelperText,
    Alert
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {changePasword} from "../../actions/auth"

const Password = ({userId}) => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [match, setMatch] = useState(true);
    const [done, setDone] = useState(false);
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
    const handleForm = (e) => {
        e.preventDefault();
        if (password !== password2) {
            setMatch(false);
        } else {
            setMatch(true);
            dispatch(changePasword({"password":password}, userId));
            setDone(true);
        }
    };


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
                    Password
                </Typography>
                <Typography fontSize={20} textAlign="center">
                    Change your password
                </Typography>
            </Grid>
            <Grid item borderBottom={0} borderColor="silver" width="100%" padding={3}>
                <form onSubmit={handleForm}>
                    <FormGroup sx={{ marginTop: "20px" }}>
                        <Grid
                            container
                            alignItems="center"
                            justifyItems="center"
                            columnSpacing={4}
                            rowSpacing={3}
                        >
                            <Grid item xs={5}>
                                <FormControl variant="outlined" margin="10" fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? "text" : "password"}
                                        onChange={(newValue) => {
                                            setPassword(newValue.target.value);
                                            console.log(newValue.target.value);
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
                            <Grid item xs={7}></Grid>

                            <Grid item xs={5}>
                                <FormControl variant="outlined" margin="10" fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Confirm password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword2 ? "text" : "password"}
                                        onChange={(newValue) => {
                                            setPassword2(newValue.target.value);
                                        }}
                                        endAdornment={
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
                                        }
                                        label="Confirm password"
                                    />{!match ? <FormHelperText error id="accountId-error">
                                        Passwords do not match
                                    </FormHelperText> : null}
                                </FormControl>
                            </Grid>
                            {done? <Grid item xs={7}><Alert severity="success">Your password has been updated!</Alert></Grid> : null}
                            <Grid item xs={12}></Grid>
                            <Grid item xs={12}></Grid>
                            <Grid item xs={12}></Grid>
                            <Grid item xs={12}></Grid>
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

export default Password;
