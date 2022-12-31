import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Link } from "@mui/material";
import useStyles from "../../../css/course";
import styled from "@emotion/styled";
import { payCourse } from "../../../api/individualTrainees";
import { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLoggedUser } from "../../../actions/auth";
import * as individualTraineeApi from "../../../api/individualTrainees.js";
import RequestAccess from "../../RequestAccess";
import { addCourseRequest } from "../../../actions/requests";

export default function CourseCard({
  isCourseInUserCourses,
  course,
  traineeType,
  userObject,
}) {
  console.log(userObject);
  const { classes } = useStyles();
  const history = useHistory();
  const MyInfo = styled(Typography)({
    color: "#757071",
    fontSize: 12,
  });
  console.log("IS HERE COURSE ? : ", isCourseInUserCourses);
  console.log("THE CoURSE IS  : ", course);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleOpen = () => {
    console.log(open);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (message) => {
    setIsLoading(true);
    const courseRequest = {
      courseId: course?._id,
      request: message,
      courseName: course?.title,
      userName: userObject?.userName,
      userId: userObject?._id,
      email: userObject?.email,
    };

    dispatch(addCourseRequest(courseRequest));
    setTimeout(() => {
      setOpen(false);
    }, 3000);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const calculateAndSetProgress = () => {
    let totalDuration = 0;
    userObject?.courses
      ?.find((c) => c._id === course._id)
      ?.seenContent?.forEach((g) => {
        totalDuration += g.duration;
      });
    userObject?.courses
      ?.find((c) => c._id === course._id)
      ?.grades?.forEach((g) => {
        totalDuration += g.total * 5;
      });

    console.log("This is total Duration", totalDuration);
    console.log("this is course duration", course?.duration);

    setProgress(Math.ceil(totalDuration / (course?.duration * 60)) * 100);
  };
  useEffect(() => {
    calculateAndSetProgress();
  }, [userObject?.courses?.find((c) => c._id === course._id)?.seenContent]);

  const requestRefund = () => {
    //make the refund request here
  };
  const calculateProgressAndCheckUserInCourses = () => {
    if (isCourseInUserCourses) {
      if (progress <= 50) {
        return (
          <Grid mt={2} item md={12}>
            <div onClick={requestRefund} className={classes.buyNow}>
              <Typography
                sx={{ fontWeight: "bold", padding: 1, textAlign: "center" }}
                variant="body1"
              >
                {/* TODO Checking if he has the course */}
                Request Refund
              </Typography>
            </div>
          </Grid>
        );
      } else return null;
    } else return null;
  };
  const payForCourse = async () => {
    try {
      const { data } = await payCourse({
        course,
        instructorId: course.instructor.instructorId,
      });
      window.location = data.url;
    } catch (error) {
      console.log(error);
    }
  };

  const requestCourse = () => {
    handleOpen();
  };

  let button;
  if (isCourseInUserCourses) {
    button = (
      <Button
        fullWidth
        onClick={() => history.push("/test")}
        sx={{
          "&:hover": { backgroundColor: "#2F2B2E" },
          backgroundColor: "#2F2B2E",
        }}
        variant="contained"
      >
        Go to Course
      </Button>
    );
  } else if (traineeType === "corporateTrainee") {
    button = (
      <Button
        fullWidth
        sx={{
          "&:hover": { backgroundColor: "#2F2B2E" },
          backgroundColor: "#2F2B2E",
        }}
        variant="contained"
        onClick={requestCourse}
      >
        {" "}
        Request Course
      </Button>
    );
  } else {
    button = (
      <Button
        fullWidth
        sx={{
          "&:hover": { backgroundColor: "#2F2B2E" },
          backgroundColor: "#2F2B2E",
        }}
        variant="contained"
        onClick={payForCourse}
      >
        {" "}
        Add to Cart
      </Button>
    );
  }

  return (
    <>
      <RequestAccess
        isLoading={isLoading}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        open={open}
      ></RequestAccess>
      <Card sx={{ width: 345 }}>
        <CardMedia
          component="iframe"
          image="https://www.youtube.com/embed/TpWqNqNv2AQ"
          title="YouTube video player"
          controls
          alt="green iguana"
          sx={{ width: "100%", height: "230px" }}
        />
        <CardContent>
          {course.price !== course.discountedPrice && (
            <Typography className={classes.courseOldPrice}>
              <span style={{ textDecoration: "line-through" }}>
                ${course.price}
              </span>
              <span style={{ color: "red", fontWeight: "normal" }}>
                {"  "}
                Valid Until {course.promotion.endDate.substring(0, 10)}
              </span>
            </Typography>
          )}
          <Typography
            className={classes.coursePrice}
            gutterBottom
            variant="h5"
            component="div"
          >
            ${course.discountedPrice}
          </Typography>
          <Grid columnSpacing={4} container direction="row">
            <Grid item md={12}>
              {" "}
              {button}{" "}
            </Grid>

            {calculateProgressAndCheckUserInCourses()}
            <Grid container alignItems="center" direction="column" item>
              <Grid mt={1} item>
                <MyInfo>30-Day Money-Back Guarantee</MyInfo>
              </Grid>
              <Grid mt={1} item>
                <MyInfo>Full Lifetime Access</MyInfo>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
