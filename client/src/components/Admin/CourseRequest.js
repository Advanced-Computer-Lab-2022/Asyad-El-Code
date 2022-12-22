import { Grid, Typography, Button, Card, CardContent, CardActions, Snackbar, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useDispatch, useSelector } from "react-redux";
import { getCourseRequests, deleteCourseRequest, acceptCourseRequest, rejectCourseRequest } from "../../actions/requests";
import CloseIcon from '@mui/icons-material/Close';




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

const CourseRequests = () => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const dispatch = useDispatch();
    const requests = useSelector((r) => r.requests);


    useEffect(() => {
        dispatch(getCourseRequests());
    }, []);

    const handleAccept = (id, email, courseName) => {
        const request = {
            email: email,
            courseName: courseName
        }
        dispatch(acceptCourseRequest(request));
        dispatch(deleteCourseRequest(id));
        setMessage("Course Request Accepted");
        setOpen(true);
    }

    const handleReject = (id, email, courseName) => {
        const request = {
            email: email,
            courseName: courseName
        }
        dispatch(rejectCourseRequest(request));
        dispatch(deleteCourseRequest(id));
        setMessage("Course Request Rejected");
        setOpen(true);
    }


    const handleClose = (event) => {
        setOpen(false);
    };

    const accept = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );



    return (
        <>
            <div>

                <Grid container maxWidth="80%" marginTop={2} marginLeft={20} marginRight={20} marginBottom={5} spacing={5} direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" component="div" gutterBottom>
                            Course Requests
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                    {requests?.map((request) => (
                        <>
                            <Grid item xs={3}>
                            </Grid>
                            <Grid item xs={6} key={request._id}>
                                <Card sx={{ minWidth: 500 }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {request?.userName} has requested to take {request?.courseName}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            {request?.date?.substring(0, 10)  + ",     " + request?.date?.substring(11, 16)}
                                        </Typography>
                                        <Typography variant="body2">
                                            {request?.request}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Grid container spacing={1}>
                                            <Grid item xs={8}>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button size="small" onClick={() => handleReject(request?._id, request?.email, request?.courseName)}>Reject</Button>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button size="small" variant='contained' onClick={() => handleAccept(request?._id, request?.email, request?.courseName)}>Approve</Button>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                            </Grid>
                        </>
                    ))}
                </Grid>
            </div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={accept}
            />

        </>
    )
}

export default CourseRequests;