import { Grid, Typography, Button, Card, CardContent, CardActions, Snackbar, IconButton, Chip } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCourseRequests, deleteCourseRequest, acceptCourseRequest, rejectCourseRequest } from "../../actions/requests";
import CloseIcon from '@mui/icons-material/Close';
import { getRefunds, refundCourse, acceptRefund, rejectRefund, deleteRefundRequest } from '../../api/admin';


const RefundPage = () => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const dispatch = useDispatch();
    const [refunds, setRefunds] = useState([]);

    
    // fetch all refunds from the database and store them in the refunds state
    useEffect(() => {
        const fetchRefunds = async () => {
            console.log("fetching refunds");
            const { data } = await getRefunds();
            setRefunds(data);
        }
        fetchRefunds();
    }, []);
    console.log(refunds);

    const handleAccept = async (instructorId, individualTraineeId, courseId, id, email, courseName) => {
        const request = {
            instructorId: instructorId,
            individualTraineeId: individualTraineeId,
            courseId: courseId
        }
        const details = {
            email: email,
            courseName: courseName
        }
        const { data } = await refundCourse(request);
        const { data2 } = await acceptRefund(details);
        setRefunds(refunds.filter((refund) => refund._id !== id));
        const { data3 } = await deleteRefundRequest(id);
        setMessage("Money Refunded Successfully");
        setOpen(true);
    }

    const handleReject = (id, email, courseName) => {
        const details = {
            email: email,
            courseName: courseName
        }
        const { data } = rejectRefund(details);
        setRefunds(refunds.filter((refund) => refund._id !== id));
        const { data2 } = deleteRefundRequest(id);
        setMessage("Refund Request Rejected");
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


                    {refunds?.map((request) => (
                        <>

                            <Grid item md={6} key={request._id}>
                                <Card sx={{ minWidth: 500 }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {request?.firstName +" "+ request?.lastName} has requested a refund for the {request?.courseName} course.
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            {request?.refundDate?.substring(0, 10) + ",     " + request?.refundDate?.substring(11, 16) + " GMT  "}
                                            <Chip label={request?.refundType} />
                                        </Typography>
                                        <Typography variant="body2">
                                            {request?.refundReason}
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
                                                <Button size="small" variant='contained' style={{ backgroundColor: "#205295" }} onClick={() => handleAccept(request?.instructorId, request?.individualTraineeId, request?.courseId, request?._id, request?.email, request?.courseName)}>Approve</Button>
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

export default RefundPage;