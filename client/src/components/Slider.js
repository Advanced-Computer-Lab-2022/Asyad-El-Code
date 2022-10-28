import React, { Component } from "react";
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
} from "@mui/material";
import course from "../images/course.jpeg";
import useStyles from "../css/slider.js";
import { Stack } from "@mui/system";

export const SimpleSlider = () => {
  const handleClick = () => {
    console.log("CLICKED");
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#808080" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#808080" }}
        onClick={onClick}
      />
    );
  }
  const { classes } = useStyles();
  var settings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <div style={{ width: "1200px" }}>
      <Slider {...settings}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
          return (
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
                  Compelete tutorial by javaScript mastery toruel
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Roberto Joseph
                </Typography>
                <Stack spacing={1} direction="row">
                  <p>4.5</p>
                  <Rating readOnly sx={{ alignItems: "center" }}>
                    jgdsjdjhs
                  </Rating>
                  <p style={{ alignSelf: "center" }}>n5332</p>
                </Stack>
                <Typography variant="body1" fontWeight="bold">
                  $70203
                </Typography>
              </CardContent>
              <CardActions>
                <Button>Hello world</Button>
              </CardActions>
            </Card>
          );
        })}
      </Slider>
    </div>
  );
};
export default SimpleSlider;
