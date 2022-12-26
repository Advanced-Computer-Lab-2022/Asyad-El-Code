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

export const CoursesGrid = () => {
  const [detailsBox, setDetailsBox] = useState(false);
  const [title, setTitle] = useState("");
  const { isLoading, courses } = useSelector((c) => c.courses);
  const selectedCountry = useSelector((c) => c.selectedCountry);
  const rates = useSelector((c) => c.currencyRates);
  const handleClick = () => {
    console.log("CLICKED");
  };
  const { classes } = useStyles();
  const cardRef = useRef();
  const cardHeight = cardRef.current ? cardRef.current.offsetHeight : 0;
  return isLoading ? (
    <CircularProgress></CircularProgress>
  ) : (
    <Container maxWidth="md" sx={{ backgroundColor: "#F2F0EF" }}>
      <Grid container spacing={2} marginTop="20px" justifyContent={"center"}>
        {courses.map((course, index) => {
          return (
            <Grid item xs={4}>
              <Card
                ref={cardRef}
                onClick={handleClick}
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
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.title}
                  </Typography>
                  <Stack spacing={1} direction="row">
                    <p>{course.rating}</p>
                    <Rating
                      readOnly
                      value={course.rating}
                      precision={0.1}
                      sx={{ alignItems: "center" }}
                    >
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
                  {course.price !== course.discountedPrice && (
                    <Typography>
                      <span
                        style={{
                          color: "grey",
                          textDecoration: "line-through",
                        }}
                      >
                        {getRate(selectedCountry, course.price, rates)}
                      </span>
                      <span style={{ color: "red" }}>
                        {" "}
                        Valid Until {course.promotion.endDate.substring(0, 10)}
                      </span>
                    </Typography>
                  )}
                  <Typography variant="body1" fontWeight="bold">
                    {getRate(selectedCountry, course.discountedPrice, rates)}
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
