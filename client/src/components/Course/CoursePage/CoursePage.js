import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import LanguageIcon from "@mui/icons-material/Language";

import useStyles from "../../../css/course";
import CourseCard from "./CourseCard";
import Link from "@mui/material/Link";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { styled } from "@mui/material";
import CourseBenefits from "./CourseBenefits";
import CourseContent from "./CourseSections";
import ReportCourseModal from "./ReportCourseModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTrainee } from "../../../actions/individualTrainees";
import { getAllProblems } from "../../../actions/reportedProblems";
import { getCorporate } from "../../../actions/corporate";

export const CoursePage = () => {
  const { isLoading, courses } = useSelector((state) => state.courses);

  const dispatch = useDispatch();
  const { classes } = useStyles();
  const MyLink = styled(Link)({
    color: "#CDBEFB",
    alignSelf: "center",
  });

  const MyTypography = styled(Typography)({
    color: "white",
  });

  const user = JSON.parse(localStorage.getItem("profile"));
  const [traineeType, setTraineeType] = useState(user?.type);
  const [progress, setProgress] = useState(0);
  const [reportCourseModal, setReportCourseModal] = useState(false);

  const corporateTrainee = useSelector((state) => state?.corporates);
  const individualTrainee = useSelector((state) => state?.individualTrainee);

  const reportedProblems = useSelector((state) => state?.reportedProblems);

  useEffect(() => {
    if (traineeType === "corporateTrainee") {
      dispatch(getCorporate());
    } else {
      dispatch(getTrainee());
    }
    dispatch(getAllProblems());

    calculateAndSetProgress();
  }, []);

  const handleCloseReportCourseModal = () => {
    setReportCourseModal(false);
  };
  let isCourseInUserCourses = false;

  //Create a function to get the user

  if (traineeType === "individualTrainee") {
    if (individualTrainee?.courses?.length > 0) {
      isCourseInUserCourses = individualTrainee?.courses?.find(
        (c) => c._id === courses[0]?._id
      );
    }
  } else {
    if (corporateTrainee?.courses?.length > 0) {
      isCourseInUserCourses = corporateTrainee?.courses?.find(
        (c) => c._id === courses[0]?._id
      );
    }
  }

  const calculateAndSetProgress = () => {
    let totalDuration = 0;
    individualTrainee?.courses
      ?.find((c) => c._id === courses[0]?._id)
      ?.seenContent?.forEach((g) => {
        totalDuration += g.duration;
      });
    individualTrainee?.courses
      ?.find((c) => c._id === courses[0]?._id)
      ?.grades?.forEach((g) => {
        totalDuration += g.total * 5;
      });
    setProgress(Math.ceil(totalDuration / (courses[0]?.duration * 60)) * 100);
  };
  console.log("the course ZERO is ", courses[0]);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div className={classes.root}>
            <Container>
              <Grid columnSpacing={3} direction="row" container>
                <Grid item mt={5} md={8}>
                  <MyTypography className={classes.courseTitle} variant="h5">
                    {courses[0].title}
                  </MyTypography>
                  <Typography className={classes.courseSubtitle} variant="h6">
                    sdnbmsdnba
                  </Typography>

                  <Stack spacing={1} direction="row">
                    <p className={classes.rating}>{courses[0]?.rating}</p>
                    <Rating
                      precision={0.5}
                      className={classes.rating}
                      defaultValue={parseFloat(courses[0]?.rating)}
                      emptyIcon={
                        <StarBorderIcon
                          fontSize="inherit"
                          className={classes.emptyStar}
                        />
                      }
                      readOnly
                      sx={{ alignItems: "center" }}
                    ></Rating>
                    {/* Create a grid  */}

                    <MyLink underline="always" href="#">
                      (154.223 ratings)
                    </MyLink>
                  </Stack>
                  <Stack spacing={2} direction="row">
                    <MyTypography variant="body2">
                      Created by{" "}
                      <MyLink
                        underline="always"
                        href={`/instructorProfile/${courses[0].instructor?.instructorId}`}
                      >
                        {courses[0].instructor?.name}
                      </MyLink>
                    </MyTypography>
                  </Stack>
                  <Stack mt={1} spacing={1} direction="row">
                    <LanguageIcon className={classes.earth}></LanguageIcon>
                    <MyTypography variant="body2">English</MyTypography>
                  </Stack>
                </Grid>
                <Grid item mt={5}>
                  <CourseCard
                    userObject={
                      traineeType === "individualTrainee"
                        ? individualTrainee
                        : corporateTrainee
                    }
                    course={courses[0]}
                    isCourseInUserCourses={isCourseInUserCourses}
                    traineeType={traineeType}
                  ></CourseCard>
                </Grid>
              </Grid>
            </Container>
          </div>
          <Container>
            <Grid container>
              <Grid item md={12}>
                <CourseBenefits></CourseBenefits>
              </Grid>
              <Grid item md={12}>
                <Typography mt={3} sx={{ fontWeight: "bold" }} variant="h5">
                  Course Content
                </Typography>
              </Grid>
              <Grid item md={8}>
                <CourseContent course={courses[0]}></CourseContent>
              </Grid>
            </Grid>
            {user ? (
              <Grid container justifyContent="center">
                <Grid item md={10} border={1} margin={3}>
                  <Button
                    fullWidth
                    sx={{
                      "&:hover": { backgroundColor: "#FAF9F6" },
                      backgroundColor: "#FFFFFF",
                      color: "#2F2B2E",
                      fontWeight: "bold",
                    }}
                    variant="contained"
                    onClick={() => {
                      setReportCourseModal(true);
                    }}
                  >
                    {" "}
                    Report this course
                  </Button>
                </Grid>
              </Grid>
            ) : null}
            <ReportCourseModal
              open={reportCourseModal}
              refund={false}
              handleClose={handleCloseReportCourseModal}
              course={courses[0]}
              reporterEmail={user?.result?.email}
            />
          </Container>{" "}
        </>
      )}
    </>
  );
};

export default CoursePage;
