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
import WalletIcon from '@mui/icons-material/Wallet';

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Payments = ({ wallet }) => {



    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignContent="center"
            color="#1C1D1F"
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
                    Wallet
                </Typography>
                <Typography fontSize={20} textAlign="center">
                    View your wallet balance and transactions
                </Typography>
            </Grid>
            <Grid
                container
                spacing={5}
                padding={1}
                marginTop={1}
                marginBottom={4}
                paddingBottom={1}
                alignItems="center"
            >
                <Grid item xs={6} marginLeft={5}>
                    <InputLabel htmlFor="outlined-adornment-password">
                        Wallet
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        value={ wallet?(wallet.toFixed(2)):("0.00")}
                        readOnly
                        endAdornment={
                            <WalletIcon position="end">
                            </WalletIcon>
                        }
                        label="Wallet Balance"
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Payments;
