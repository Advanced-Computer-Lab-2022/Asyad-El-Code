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
  TextField,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import useStyles from "../../../css/slider.js";
import image from "../../../images/course.jpeg";
import { useSelector } from "react-redux";
import { getRate } from "../../util.js";
import { UdacityCard } from "./UdacityCard/UdacityCard.js";
import { SearchBar } from "./SearchBar.js";

export const CoursesGrid = ({ type, search }) => {
  const [detailsBox, setDetailsBox] = useState(false);
  const [title, setTitle] = useState("");
  const { isLoading, courses } = useSelector((c) => c.courses);
  // const [search, setSearch] = useState("");

  const filteredCoursesBySubjectOrTitleOrInstructor = courses.filter(
    (course) => {
      return (
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.subject.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  );

  return isLoading ? (
    <CircularProgress></CircularProgress>
  ) : (
<<<<<<< HEAD
    <Container sx={{ mt: "20px" }}>
      {/* <TextField
=======
    <Container sx={{ mt: "20px", ml: 10 }}>
      <TextField
>>>>>>> c14c9f6c57e45d7dbff9f80d748e8d0db4062c96
        onChange={(e) => setSearch(e.target.value)}
        variant="outlined"
        size="small"
        label="search cours"
      ></TextField> */}
      <Grid container columnSpacing={13} rowSpacing={3}>
        {filteredCoursesBySubjectOrTitleOrInstructor.map((course, index) => {
          return (
            <Grid key={index} item xs={6}>
              <UdacityCard type={type} course={course}></UdacityCard>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
