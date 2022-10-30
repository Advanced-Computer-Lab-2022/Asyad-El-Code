import React, { Component, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Rating,
  Typography,
  Grid,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import useStyles from "../../css/slider.js";
import course from "../../images/course.jpeg";
import { useSelector } from "react-redux";

export const CoursesGrid = () => {
  const [detailsBox, setDetailsBox] = useState(false);
  const [title, setTitle] = useState("");
  const courses = useSelector((c) => c.courses);
  const handleClick = () => {
    console.log("CLICKED");
  };
  const { classes } = useStyles();
  return (
    <Container maxWidth="md" sx={{ backgroundColor: "#F2F0EF" }}>
      <Grid container spacing={2} marginTop="20px" justifyContent={"center"}>
        {courses.map((course, index) => {
          return (
            <Grid item xs={4}>
              <Card
                onClick={handleClick}
                elevation={0}
                className={classes.cardGrid}
                key={index}
              >
                <CardMedia
                  component="img"
                  image={course}
                  className={classes.cardMedia}
                ></CardMedia>
                <CardContent>
                  <Typography
                    className={classes.cardHeader}
                    gutterBottom
                    variant="h6"
                    component="div"
                  >
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.title}
                  </Typography>
                  <Stack spacing={1} direction="row">
                    <p>{course.rating}</p>
                    <Rating readOnly sx={{ alignItems: "center" }}>
                      jgdsjdjhs
                    </Rating>
                    <p style={{ alignSelf: "center" }}>n5332</p>
                  </Stack>
                  <Typography>What will you learn?</Typography>
                  <ul>
                    {" "}
                    {course.outlines.map((item, index) => {
                      return <li>{item.outline}</li>;
                    })}
                  </ul>
                  <Typography variant="body1" fontWeight="bold">
                    {`$ ${course.price}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button endIcon="">Add To Cart</Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
