import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  CardActions,
  Grid,
  Link,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import useStyles from "../../css/home";
import study from "../../images/study.jpeg";
import Members, { PopularCourses } from "./PopularCourses";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../actions/courses";
import "./home.css";
import background from "../../images/code.jpg";
import styled from "@emotion/styled";
import { Reviews } from "./Reviews/Reviews";

const MyTypography = styled(Typography)({
  color: "white",
});
export const Home = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const handleOver = (event) => {
    console.log("HIIISID");
  };

  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const user = JSON.parse(localStorage.getItem("profile"));
  console.log("USER IS NULLLLL", user);
  return (
    <div className={classes.root}>
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="article"
      >
        <Container>
          <Grid container>
            <Grid md={6} spacing={3} item>
              <MyTypography sx={{ fontWeight: "400" }} variant="h1">
                <span style={{ fontWeight: "bold" }}> Learn without</span>{" "}
                <br /> limits{" "}
              </MyTypography>
              <MyTypography style={{ fontSize: 23 }} variant="body2">
                Start, switch, or advance your career with more than 5,200
                courses, Professional Certificates, and degrees from world-class
                universities and companies.
              </MyTypography>

              {/* <Stack direction="row" spacing={2}>
              <Button
                sx={{ width: "170px", padding: "20px" }}
                variant="contained"
                size="large"
              >
                Join for Free{" "}
              </Button>
              <Button variant="outlined" color={"error"} size="large">
                Explore Courses{" "}
              </Button>
            </Stack> */}
              {/* <Grid item spacing={1} container direction="row">
              <Grid item></Grid>
              <Grid item>
                <Button variant="outlined" color={"error"} size="large">
                  Explore Courses{" "}
                </Button>
              </Grid>
            </Grid> */}
            </Grid>
            {/* <Grid item md={6}>
              <img
                onMouseOver={handleOver}
                className={classes.image}
                src={study}
              ></img>
            </Grid> */}
          </Grid>
        </Container>
      </div>
      <Container>
        <Typography
          fontWeight="bold"
          gutterBottom
          sx={{ marginTop: 5, marginBottom: 5, textAlignLast: "center" }}
          variant="h3"
        >
          Popular courses
        </Typography>
        <PopularCourses></PopularCourses>
      </Container>
      <Reviews></Reviews>
    </div>
  );
};
export default Home;
