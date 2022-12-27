import React, { Component, useEffect, useState, useRef } from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Rating,
    Typography,
    Grid,
    CircularProgress,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import useStyles from "../../css/slider.js";
// import image from "../../images/course.jpeg";
import image from "../../images/point.png";
import { useSelector } from "react-redux";
import { getRate } from "../util.js";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export const CoursesGrid = () => {
    const { isLoading, courses } = useSelector((c) => c.courses);
    const selectedCountry = useSelector((c) => c.selectedCountry);
    const rates = useSelector((c) => c.currencyRates);
    const [courseList, setCourseList] = useState([]);

    const onClick = (e, course) => {
        // e.preventDefault();
        // search for course in courseList
        console.log(e);
        console.log("HELLO MUDAFUKA");
        console.log(course);
        if (courseList.find((c) => c._id === course._id)) {
            // if found, remove it
            console.log("FOUND");
            setCourseList(courseList.filter((c) => c._id !== course._id));
        } else {
            // if not found, add it
            setCourseList([...courseList, course]);
        }
    };

    const { classes } = useStyles();
    const cardRef = useRef();
    const cardHeight = cardRef.current ? cardRef.current.offsetHeight : 0;
    return isLoading ? (
        <CircularProgress></CircularProgress>
    ) : (
        <Container maxWidth="md" sx={{ backgroundColor: "#F2F0EF" }}>
            <Grid container spacing={2} marginTop="20px" justifyContent={"center"}>
                {courses?.map((course, index) => {
                    return (
                        <Grid item xs={4}>
                            <Card
                                ref={cardRef}
                                elevation={0}
                                className={classes.cardGrid}
                                key={index}
                            >
                                <CardMedia
                                    component="img"
                                    image={image}
                                    className={classes.cardMedia}
                                ></CardMedia>
                                <CardContent>
                                    <Typography
                                        className={classes.cardHeader}
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                    >
                                        {course?.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {course?.title}
                                    </Typography>
                                    <Stack spacing={1} direction="row">
                                        <p>{course.rating}</p>
                                        <Rating
                                            readOnly
                                            value={course.rating}
                                            precision={0.1}
                                            sx={{ alignItems: "center" }}
                                        >
                                        </Rating>
                                    </Stack>
                                    {course?.price !== course?.discountedPrice && (
                                        <Typography>
                                            <span
                                                style={{
                                                    color: "grey",
                                                    textDecoration: "line-through",
                                                }}
                                            >
                                                {getRate(selectedCountry, course?.price, rates)}
                                            </span>
                                            <span style={{ color: "red" }}>
                                                {" "}
                                                Valid Until {course?.promotion?.endDate.substring(0, 10)}
                                            </span>
                                        </Typography>
                                    )}
                                    <Typography variant="body1" fontWeight="bold">
                                        {getRate(selectedCountry, course?.discountedPrice, rates)}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {courseList.find((c) => c._id === course?._id) ? (
                                        <Button
                                            variant="outlined"
                                            color="success"
                                            size="small"
                                            startIcon={<CheckBoxIcon />}
                                            onClick={(e) => onClick(e, course)}
                                        >
                                            Unselect Course
                                        </Button>) :
                                        (<Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            startIcon={<CheckBoxOutlineBlankIcon />}
                                            onClick={(e) => onClick(e, course)}
                                        >
                                            Select Course
                                        </Button>)
                                    }
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};
