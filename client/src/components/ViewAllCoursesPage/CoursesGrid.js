import React, { Component, useEffect, useState, useRef } from "react";
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
  CircularProgress,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import useStyles from "../../css/slider.js";
import image from "../../images/course.jpeg";
import { useSelector } from "react-redux";
import { getRate } from "../util.js";
import { UdacityCard } from "../UdacityCard/UdacityCard.js";

export const CoursesGrid = () => {
  const [detailsBox, setDetailsBox] = useState(false);
  const [title, setTitle] = useState("");
  const { isLoading, courses } = useSelector((c) => c.courses);
  return isLoading ? (
    <CircularProgress></CircularProgress>
  ) : (
    <Container sx={{ mt: "20px" }}>
      <Grid container columnSpacing={13} rowSpacing={3}>
        {courses.map((course, index) => {
          return (
            <Grid key={index} item xs={6}>
              <UdacityCard course={course}></UdacityCard>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
