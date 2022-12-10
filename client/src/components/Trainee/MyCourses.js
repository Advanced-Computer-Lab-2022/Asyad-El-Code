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
} from "@mui/material";
import useStyles from "../../css/slider.js";
import { Stack } from "@mui/system";
import { useRef } from "react";
import "../../css/card.css";
import image from "../../images/course.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { getTrainee } from "../../actions/individualTrainees";

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

  useEffect(() => {
    dispatch(getTrainee());
  }, []);

  dispatch(getTrainee());
  return (
    <Container style={{ backgroundColor: "aqua", marginTop: 150 }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <h1>Helloworld</h1>
        </Grid>
        <Grid item xs={12} md={6}>
          <h1>Helloworld</h1>
        </Grid>
        <Grid item xs={12} md={6}>
          <h1>Helloworld</h1>
        </Grid>
        <Grid item xs={12} md={6}>
          <h1>Helloworld</h1>
        </Grid>
      </Grid>
      {courses.map((course, index) => {
        return (
          <Grid item xs={9}>
            <Card sx={{ overFlow: "hidden", display: "flex" }}>
              <CardMedia
                sx={{
                  maxWidth: 500,
                  maxHeight: 300,
                  maxInlineSize: 500,
                  display: "inline-block",
                }}
                component="img"
                image={image}
              />
              <CardContent sx={{ display: "inline-block", maxWidth: 500 }}>
                <Typography variant="h5" component="div">
                  {course.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} variant="body2">
                  {course.summary}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Updated{" "}
                  <b>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(course.releaseDate)))}{" "}
                  </b>
                  {course.duration} total hours {bull} 52 lectures
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  By <b>SADSD</b>
                </Typography>
                <Stack spacing={1} direction="row">
                  <p>4.5</p>
                  <Rating readOnly sx={{ alignItems: "center" }}></Rating>
                  <p style={{ alignSelf: "center" }}></p>
                </Stack>
              </CardContent>
              <CardActions>
                <Button size="small">Go To Course</Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
    </Container>
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
