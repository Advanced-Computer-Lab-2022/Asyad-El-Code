import { Box, AppBar, Grid, Container, Typography, Paper, Modal, FormControl, form, OutlinedInput, Input, InputLabel, FormGroup, Button, IconButton, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { addCorporate } from '../../actions/corporate';
import { useDispatch, useSelector } from "react-redux";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CorperateModal = (props) => {
    const dispatch = useDispatch();
    const handleForm = (e) => {
        const corporate = {
            userName:e.target.username.value,
            email:e.target.email.value,
            password:e.target.password.value,
        }
        console.log(corporate)
        e.preventDefault()
        dispatch(addCorporate(corporate))
        props.handleClose();

    }

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <Grid container>
                    <Grid item xs={10}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Corperate
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton xs={2} onClick={props.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <form onSubmit={handleForm}>

                    <FormGroup sx={{ marginTop: '20px' }}>
                        <FormControl variant="standard" sx={{ marginTop: '20px' }}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input
                                id="email"
                                type='email'
                                aria-describedby="component-helper-text"
                                required
                            />
                        </FormControl>
                        <FormControl variant="standard" sx={{ marginTop: '20px' }}>

                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input
                                id="username"
                                aria-describedby="component-helper-text"
                                required
                            />
                        </FormControl>
                        <FormControl variant="standard" sx={{ marginTop: '20px' }}>

                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                aria-describedby="component-helper-text"
                                required
                            />
                        </FormControl>
                        <Button type="submit" style={{ color: '#ffffff', background: '#80b918', marginTop: '20px' }}>
                            Add
                        </Button>
                    </FormGroup>
                </form>
            </Box>
        </Modal >
    )
}

export default CorperateModal;