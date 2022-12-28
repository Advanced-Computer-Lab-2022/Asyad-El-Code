import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Rating,
  Typography,
  Modal,
  Box,
  Grid,
  Container,
  Paper,
  CardActionArea,
} from "@mui/material";
import useStyles from "../../css/slider.js";
import { Stack } from "@mui/system";
import { useRef } from "react";
import "../../css/card.css";
import { useDispatch, useSelector } from "react-redux";
import { getTrainee } from "../../actions/individualTrainees";
import image from "../../images/point.png";
import { useHistory } from "react-router-dom";
import { getCourse, getCourses } from "../../actions/courses.js";
import { getAllInstructorCourses } from "../../actions/instructor.js";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const MyCourses = () => {
  const dispatch = useDispatch();
  const trainee = useSelector((t) => t.individualTrainee);
  console.log(trainee);
  const courses = trainee.courses;
  console.log(courses);
  console.log("OH MYG ODD ", trainee);
  const history = useHistory();

  useEffect(() => {
    dispatch(getTrainee());
    dispatch(getCourses());
  }, []);

  const handleClick = (courseTitle, courseId) => {
    console.log("THE COURSE ID IS ", courseId);
    console.log("THE COURSE TITLE IS ", courseTitle);
    dispatch(getCourse(courseId, history, courseTitle));
  };

  return (
    <Container>
      <Typography mt={10} gutterBottom fontWeight="bold" variant="h3">
        My courses
      </Typography>
      <Grid
        mt={10}
        style={{ backgroundColor: "#F4F7F8" }}
        container
        diection="column"
        justifyContent="center"
        alignItems="center"
        rowGap={3}
        columnGap={3}
      >
        {courses?.map((course, index) => {
          return (
            <Grid key={index} item xs={3}>
              <Card
                onClick={() => handleClick(course.title, course._id)}
                sx={{ width: 300, height: 250 }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography
                      fontWeight="bold"
                      gutterBottom
                      variant="body1"
                      component="div"
                    >
                      {course.title}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="text.secondary"
                    >
                      Dr.Walter
                      {/* It should be the instructor name !!! */}
                    </Typography>
                    <Stack mb={2} spacing={1} direction="row">
                      <Rating
                        style={{ alignSelf: "center", marginLeft: -5 }}
                        name="read-only"
                        value={parseInt(course.rating)}
                        readOnly
                      />
                      <Typography
                        gutterBottom
                        variant="body2"
                        color="text.secondary"
                      >
                        {course.rating}
                      </Typography>
                      {/* Price */}
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>

    //   {courses.map((course, index) => {
    //     return (
    //       <Grid item xs={9}>
    //         <Card sx={{ overFlow: "hidden", display: "flex" }}>
    //           <CardMedia
    //             sx={{
    //               maxWidth: 500,
    //               maxHeight: 300,
    //               maxInlineSize: 500,
    //               display: "inline-block",
    //             }}
    //             component="img"
    //             image={image}
    //           />
    //           <CardContent sx={{ display: "inline-block", maxWidth: 500 }}>
    //             <Typography variant="h5" component="div">
    //               {course.title}
    //             </Typography>
    //             <Typography sx={{ mb: 1.5 }} variant="body2">
    //               {course.summary}
    //             </Typography>
    //             <Typography variant="body2" color="text.secondary">
    //               Updated{" "}
    //               <b>
    //                 {new Intl.DateTimeFormat("en-US", {
    //                   year: "numeric",
    //                   month: "short",
    //                   day: "2-digit",
    //                 }).format(new Date(Date.parse(course.releaseDate)))}{" "}
    //               </b>
    //               {course.duration} total hours {bull} 52 lectures
    //             </Typography>
    //             <Typography variant="body2" color="text.secondary">
    //               By <b>SADSD</b>
    //             </Typography>
    //             <Stack spacing={1} direction="row">
    //               <p>4.5</p>
    //               <Rating readOnly sx={{ alignItems: "center" }}></Rating>
    //               <p style={{ alignSelf: "center" }}></p>
    //             </Stack>
    //           </CardContent>
    //           <CardActions>
    //             <Button size="small">Go To Course</Button>
    //           </CardActions>
    //         </Card>
    //       </Grid>
    //     );
    //   })}
    // <Grid container justifyContent="center" rowSpacing={4} marginBottom={10}>
    //   <Grid item xs={10} marginTop={5}>
    //     <Typography variant="h3">My courses</Typography>
    //   </Grid>
    //   {courses.map((course, index) => {
    //     return (
    //       <Grid item xs={9}>
    //         <Card sx={{ overFlow: "hidden", display: "flex" }}>
    //           <CardMedia
    //             sx={{
    //               maxWidth: 500,
    //               maxHeight: 300,
    //               maxInlineSize: 500,
    //               display: "inline-block",
    //             }}
    //             component="img"
    //             image={image}
    //           />
    //           <CardContent sx={{ display: "inline-block", maxWidth: 500 }}>
    //             <Typography variant="h5" component="div">
    //               {course.title}
    //             </Typography>
    //             <Typography sx={{ mb: 1.5 }} variant="body2">
    //               {course.summary}
    //             </Typography>
    //             <Typography variant="body2" color="text.secondary">
    //               Updated{" "}
    //               <b>
    //                 {new Intl.DateTimeFormat("en-US", {
    //                   year: "numeric",
    //                   month: "short",
    //                   day: "2-digit",
    //                 }).format(new Date(Date.parse(course.releaseDate)))}{" "}
    //               </b>
    //               {course.duration} total hours {bull} 52 lectures
    //             </Typography>
    //             <Typography variant="body2" color="text.secondary">
    //               By <b>SADSD</b>
    //             </Typography>
    //             <Stack spacing={1} direction="row">
    //               <p>4.5</p>
    //               <Rating readOnly sx={{ alignItems: "center" }}></Rating>
    //               <p style={{ alignSelf: "center" }}></p>
    //             </Stack>
    //           </CardContent>
    //           <CardActions>
    //             <Button size="small">Go To Course</Button>
    //           </CardActions>
    //         </Card>
    //       </Grid>
    //     );
    //   })}
    // </Grid>
  );
};

export default MyCourses;
