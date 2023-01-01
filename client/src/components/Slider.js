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
  CircularProgress,
  Skeleton,
  Grid,
} from "@mui/material";
import useStyles from "../css/slider.js";
import { Stack } from "@mui/system";
import { useRef } from "react";
import "../css/card.css";
import image from "../images/point.png";
import CoursePopup from "../components/Course/CoursePopup";

import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../actions/courses.js";
import { useHistory } from "react-router-dom";

import { getRate } from "./util.js";
import CardCourse from "./Course/PopularCourses/CourseCard.js";

export const SimpleSlider = () => {
  const [detailsBox, setDetailsBox] = useState(false);
  const [title, setTitle] = useState("");
  const { isLoading, courses } = useSelector((state) => state.courses);
  const selectedCountry = useSelector((c) => c.selectedCountry);
  const rates = useSelector((c) => c.currencyRates);
  const [courseDetails, setCourseDetails] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (courseId, courseTitle) => {
    dispatch(getCourse(courseId, history, courseTitle));
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = (course) => {
    setCourseDetails(course);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleMouseOver = (event, title) => {
    setTitle(title);
    setDetailsBox(true);
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
  return isLoading ? (
    <>
      <Grid container columnSpacing={20}>
        {[1, 2, 3, 4].map((e) => {
          return (
            <Grid mb={15} item xs={3}>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

              {/* For other variants, adjust the size with `width` and `height` */}
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rectangular" width={210} height={60} />
              <Skeleton variant="rounded" width={210} height={100} />
            </Grid>
          );
        })}
      </Grid>
    </>
  ) : (
    <div positon="relative">
      <div style={{ width: "1200px" }}>
        <Slider {...settings}>
          {courses?.map((course, index) => {
            return (
              // <Card elevation={0} className={classes.cardGrid} key={index}>
              //   <CardMedia
              //     onClick={() => handleClick(course._id, course.title)}
              //     component="img"
              //     image={image}
              //     className={classes.cardMedia}
              //     // onMouseOver={(event) => handleMouseOver(event, item.title)}
              //     // onMouseOut={handleMouseOut}
              //   ></CardMedia>

              //   <CardContent>
              //     <Typography
              //       className={classes.cardHeader}
              //       gutterBottom
              //       variant="h6"
              //       component="div"
              //     >
              //       {course.title}
              //     </Typography>
              //     <Typography variant="body2" color="text.secondary">
              //       {course.summary}
              //     </Typography>

              //     <Stack spacing={1} direction="row">
              //       <p>{parseFloat(course.rating)}</p>
              //       <Rating
              //         precision={0.5}
              //         defaultValue={parseFloat(course.rating)}
              //         readOnly
              //         sx={{ alignItems: "center" }}
              //       ></Rating>
              //       <p style={{ alignSelf: "center" }}>n5332</p>
              //     </Stack>
              //     <Typography variant="body1" fontWeight="bold">
              //       {/* {rates.isLoading? <CircularProgress></CircularProgress>:
              //       getRate(selectedCountry, course.price, rates.currencyRates)} */}
              //     </Typography>
              //   </CardContent>
              //   <CardActions>
              //     <Button
              //       onClick={() => handleOpen(course)}
              //       variant="outlined"
              //       size="small"
              //     >
              //       View
              //     </Button>
              //   </CardActions>
              // </Card>
              <CardCourse
                course={course}
                handleClick={handleClick}
              ></CardCourse>
            );
          })}
        </Slider>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            height: "470px",
            width: "340px",
            position: "absolute",
            top: "50%",
            left: "47%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CoursePopup courseData={courseDetails}></CoursePopup>
        </Box>
      </Modal>
    </div>
  );
};
export default SimpleSlider;
