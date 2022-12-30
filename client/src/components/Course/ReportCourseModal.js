import {
    Tab, Fab, Tabs, Box, AppBar, Grid, Container, Typography, Paper,
    Modal, FormControl, form, OutlinedInput, Input, InputLabel,
    FormGroup, Button, IconButton, TextField, Dialog, DialogActions, MenuItem, DialogContent, DialogContentText, DialogTitle, Select
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { blue } from '@mui/material/colors';
import { reportProblem } from '../../actions/reportedProblems';



export default function AdminModal(props) {
    const dispatch = useDispatch();
    const [type, setType] = React.useState('');
    const [details, setDetails] = React.useState('');
    const handleTypeChange = event => {
        setType(event.target.value);
    };

    const handleDetailsChange = event => {
        setDetails(event.target.value);
    };

    const handleSubmit = () => {
        console.log('Type:', type);
        console.log('Details:', details);
        const problem = {
            reporterEmail: props?.reporterEmail,
            courseId: props?.course._id,
            courseName: props?.course.title,
            type: type,
            details: details,
        }
        console.log(problem)
        dispatch(reportProblem(problem))
        props.handleClose();
    };

    const handleForm = (e) => {

        // const admin = {
        //     userName: e.target.username.value,
        //     email: e.target.email.value,
        //     password: e.target.password.value,
        // }
        // console.log(admin)
        // e.preventDefault()
        // dispatch(addAdmin(admin))
        // props.handleClose();
    }

    return (
        // <Modal
        //     open={props.open}
        //     onClose={props.handleClose}
        //     aria-labelledby="modal-modal-title"
        //     aria-describedby="modal-modal-description"
        // >

        //     {/* <Box sx={style} >
        //         <Grid container>
        //             <Grid item xs={10}>
        //                 <Typography id="modal-modal-title" variant="h6" component="h2">
        //                     Add Admin
        //                 </Typography>
        //             </Grid>
        //             <Grid item>
        //                 <IconButton xs={2} onClick={props.handleClose}>
        //                     <CloseIcon />
        //                 </IconButton>
        //             </Grid>
        //         </Grid>
        //         <form onSubmit={handleForm}>

        //             <FormGroup sx={{ marginTop: '20px' }}>
        //                 <FormControl variant="standard" sx={{ marginTop: '20px' }}>
        //                     <InputLabel htmlFor="email">Email</InputLabel>
        //                     <Input
        //                         id="email"
        //                         type='email'
        //                         aria-describedby="component-helper-text"
        //                         required
        //                     />
        //                 </FormControl>
        //                 <FormControl variant="standard" sx={{ marginTop: '20px' }}>

        //                     <InputLabel htmlFor="username">Username</InputLabel>
        //                     <Input
        //                         id="username"
        //                         aria-describedby="component-helper-text"
        //                         required
        //                     />
        //                 </FormControl>
        //                 <FormControl variant="standard" sx={{ marginTop: '20px' }}>

        //                     <InputLabel htmlFor="password">Password</InputLabel>
        //                     <Input
        //                         id="password"
        //                         aria-describedby="component-helper-text"
        //                         required
        //                     />
        //                 </FormControl>
        //                 <Button type="submit" style={{ color: '#ffffff', background: '#80b918', marginTop: '20px' }}>
        //                     Add
        //                 </Button>
        //             </FormGroup>
        //         </form>
        //     </Box> */}
        // </Modal >

        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle margin={1} id="form-dialog-title">Report a problem</DialogTitle>
            <DialogContent>
                <DialogContentText padding={1}>
                    Please select the type of problem you are experiencing and provide any additional details that may be helpful in resolving the issue.
                </DialogContentText>
                <FormControl fullWidth>
                    <InputLabel id="type-select-label">Type</InputLabel>
                    <Select
                        labelId="type-select-label"
                        id="type-select"
                        value={type}
                        onChange={handleTypeChange}
                        label="Type"
                        required
                    >
                        <MenuItem value="technical">Technical issue</MenuItem>
                        <MenuItem value="financial">Financial issue</MenuItem>
                        <MenuItem value="content">Content issue</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    autoFocus
                    margin="dense"
                    id="details"
                    label="Details"
                    type="text"
                    fullWidth
                    value={details}
                    onChange={handleDetailsChange}
                    required
                    sx={{ marginTop: '20px' }}
                    multiline={true}
                    rows={4}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} sx={{
                    "&:hover": { backgroundColor: "#FAF9F6" },
                    backgroundColor: "#FFFFFF",
                    color: "#2F2B2E",
                    fontWeight: "bold",
                }}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} sx={{
                    "&:hover": { backgroundColor: "#FAF9F6" },
                    backgroundColor: "#FFFFFF",
                    color: "#2F2B2E",
                    fontWeight: "bold",
                }}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>

    )
}
