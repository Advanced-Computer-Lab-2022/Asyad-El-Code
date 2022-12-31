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
import { getLoggedUser } from "../../../actions/auth";
import * as individualTraineeApi from "../../../api/individualTrainees.js";
import * as courseApi from "../../../api/course";
import { useDispatch, useSelector } from "react-redux";
import ReportCourseModal from "./ReportCourseModal";

export default function CourseCard({
  isCourseInUserCourses,
  course,
  traineeType,
  userObject,
}) {
  const { classes } = useStyles();
  const history = useHistory();
  const MyInfo = styled(Typography)({
    color: "#757071",
    fontSize: 12,
  });

  const [type, setType] = React.useState("");
  const [details, setDetails] = React.useState("");
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
  };

  const handleRefundClose = () => {
    setRefundModal(false);
  };
  const [progress, setProgress] = useState(0);

  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.authReducer);
  const [refundReason, setRefundReason] = useState("");
  const [refundType, setRefundType] = useState("");

  const handleRefundTypeChange = (event) => {
    setRefundType(event.target.value);
  };
  const handleRefundReasonChange = (event) => {
    setRefundReason(event.target.value);
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

  const requestRefund = async () => {
    const { data } = await courseApi.requestRefund({
      course: course,
      type: authData?.type,
      individualTraineeId:
        authData?.type === "individualTrainee" ? authData?.result?._id : null,
      coorporateTraineeId:
        authData?.type === "coorporateTrainee" ? authData?.result?._id : null,
      firstName: authData?.result?.firstName,
      lastName: authData?.result?.lastName,
      email: authData?.result?.email,
      refundReason: refundReason,
      refundType: refundType,
    });
    handleRefundClose();
    console.log(data);
  };
  useEffect(() => {
    dispatch(getLoggedUser());
  }, []);

  const [refundModal, setRefundModal] = useState(false);

  const calculateProgressAndCheckUserInCourses = () => {
    if (isCourseInUserCourses) {
      if (progress <= 50) {
        return (
          <Grid mt={2} item md={12}>
            <Button
              fullWidth
              style={{
                color: "black",
                textTransform: "none",
                "&:hover": { backgroundColor: "#2F2B2E" },
              }}
              onClick={() => setRefundModal(true)}
              variant="outlined"
            >
              {/* TODO Checking if he has the course */}
              Request Refund
            </Button>
            <ReportCourseModal
              open={refundModal}
              handleClose={handleRefundClose}
              refund={true}
              requestRefund={requestRefund}
              refundReason={refundReason}
              refundType={refundType}
              handleRefundReasonChange={handleRefundReasonChange}
              handleRefundTypeChange={handleRefundTypeChange}
            ></ReportCourseModal>
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
    console.log("Request Course");
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
  } else if (traineeType === "instructor") {
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
        {/* TODO TO hide this button when the instructor that has the course in this page */}
        Add to Cart
      </Button>
    );
  }

  return (
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
  );
}
