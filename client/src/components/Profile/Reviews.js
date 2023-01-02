import {
    Grid,
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    Chip,
    TextField,
    Avatar,
    Rating,
} from "@mui/material";
import React from "react";
import SplitButton from "../Admin/SplitButton";
import { useState } from "react";
import * as instructorApi from "../../api/instructor"

const Reviews = ({ instructor, userNames }) => {

    console.log(instructor);
    console.log(userNames);
    const getTheAvatar = (name) => {
        console.log(name);
        const names = name?.split(" ");
        const first = names[0]?.charAt(0);
        const last = names[1]?.charAt(0);
        return first + last;
    };

    // const onChange = (e) => {
    //   setReportedProblems(
    //     reportedProblems.map((problem) => {
    //       if (problem._id === e.target.id) {
    //         problem.response = e.target.value;
    //       }
    //       return problem;
    //     })
    //   );
    // };

    return (
        <Grid
            container
            direction="column"
            alignContent="center"
            color="#1C1D1F"
            minheight={700}
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
                    Ratings and Reviews
                </Typography>
                <Typography fontSize={20} textAlign="center">
                    View all your ratings and reviews
                </Typography>
            </Grid>
            <Grid item borderColor="silver" width="100%" padding={3}>
                {!instructor?.ratings || instructor?.ratings.length === 0 ? (
                    <Typography fontSize={20} textAlign="center" marginTop={5}>
                        No Reviews to show
                    </Typography>
                ) : (
                    <Grid
                        container
                        spacing={5}
                        padding={1}
                        marginTop={1}
                        marginBottom={4}
                        paddingBottom={1}
                        justifyContent="center"
                        alignItems="center"
                    >
                        {instructor?.reviews?.map((review, index) => (
                            <Grid item xs={6}>
                                <Card sx={{ minWidth: 500, backgroundColor: "#EEEEEE" }}>
                                    <CardContent>
                                        <Grid container width="100%">
                                            <Grid container width="100%" borderBottom={1} borderColor="silver">
                                                <Grid item xs={3}>
                                                    <Avatar>
                                                        {getTheAvatar(userNames[index])}
                                                    </Avatar>
                                                </Grid>
                                                <Grid item xs={2}></Grid>
                                                <Grid item xs={7}>
                                                    <Typography variant="h6" component="div">
                                                        {userNames[index]}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} textAlign="center">
                                                    <Rating value={instructor?.ratings[index]?.rating} readOnly />
                                                </Grid>
                                            </Grid>
                                            <Grid container width="100%" marginTop={1}>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        variant="body2"
                                                        component="div"
                                                        textAlign="center"
                                                    >
                                                        {review?.review}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>

                        ))}
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default Reviews;
