import { Grid, Typography, Button, Card, CardContent, CardActions, Snackbar, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useDispatch, useSelector } from "react-redux";
import { getCourseRequests, deleteCourseRequest, acceptCourseRequest, rejectCourseRequest } from "../../actions/requests";
import CloseIcon from '@mui/icons-material/Close';
import { provideCourse } from '../../api/admin';


const CourseRequests = () => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const dispatch = useDispatch();
    const requests = useSelector((r) => r.requests);


    useEffect(() => {
        dispatch(getCourseRequests());
    }, []);

    const handleAccept = async (id, email, courseName, courseId, corpId) => {
        const request = {
            email: email,
            courseName: courseName
        }
        dispatch(acceptCourseRequest(request));
        dispatch(deleteCourseRequest(id));
        const { data } = await provideCourse(courseId, corpId);
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

                <Grid container maxWidth="100%" spacing={5} direction="row"  alignItems="center">


                    {requests?.map((request) => (
                        <>

                            <Grid item md={6} key={request._id}>
                                <Card sx={{ minWidth: 500 }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {request?.userName} has requested to take {request?.courseName}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            {request?.date?.substring(0, 10) + ",     " + request?.date?.substring(11, 16) + " GMT"}
                                        </Typography>
                                        <Typography variant="body2">
                                            {request?.request}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Grid container spacing={1}>
                                            <Grid item xs={7}>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button size="small" onClick={() => handleReject(request?._id, request?.email, request?.courseName)}>Reject</Button>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button size="small" variant='contained' style={{ backgroundColor: "#205295" }} onClick={() => handleAccept(request?._id, request?.email, request?.courseName, request?.courseId, request?.userId)}>Approve</Button>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
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