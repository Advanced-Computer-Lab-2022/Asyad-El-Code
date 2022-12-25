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

import useStyles from "../../css/course";
import CourseCard from "./CourseCard";
import Link from "@mui/material/Link";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { styled } from "@mui/material";
import CourseBenefits from "./CourseBenefits";
import CourseContent from "./CourseSections";
import ReportCourseModal from "./ReportCourseModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTrainee } from "../../actions/individualTrainees";
import { getAllProblems } from "../../actions/reportedProblems";

export const CoursePage = () => {
  const { isLoading, courses } = useSelector((state) => state.courses);
  console.log("courses in state now is", courses);
  console.log("HHHHHH");

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
  console.log("Iam the user", user);
  useEffect(() => {
    dispatch(getTrainee());
    dispatch(getAllProblems());
  }, []);
  const [reportCourseModal, setReportCourseModal] = useState(false);
  const handleCloseReportCourseModal = () => {
    setReportCourseModal(false);
  };

  const individualTrainee = useSelector((state) => state?.individualTrainee);
  console.log("The state is ", individualTrainee);
  console.log(individualTrainee?.courses);
  console.log("COURSE[0] is ", courses[0]);
  const isCourseInUserCourses = individualTrainee?.courses?.find(
    (c) => c._id === courses[0]?._id
  );

  console.log("Iam the isCourseInUserCourses", isCourseInUserCourses);

  const reportedProblems = useSelector((state) => state?.reportedProblems);
  console.log("The reported problems are", reportedProblems);

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
                    {courses[0].summary}
                  </Typography>

                  <Stack spacing={1} direction="row">
                    <p className={classes.rating}>{courses[0].rating}</p>
                    <Rating
                      precision={0.5}
                      className={classes.rating}
                      defaultValue={parseFloat(courses[0].rating)}
                      emptyIcon={
                        <StarBorderIcon
                          fontSize="inherit"
                          className={classes.emptyStar}
                        />
                      }
                      readOnly
                      sx={{ alignItems: "center" }}
                    ></Rating>

                    <MyLink underline="always" href="#">
                      (154.223 ratings)
                    </MyLink>
                  </Stack>
                  <Stack spacing={2} direction="row">
                    <MyTypography variant="body2">
                      Created by{" "}
                      <MyLink underline="always" href="#">
                        {courses[0].in}
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
                    course={courses[0]}
                    isCourseInUserCourses={isCourseInUserCourses}
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
            {
              user ? (
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
                      onClick={() => {setReportCourseModal(true)}}
                    >
                      {" "}
                      Report this course
                    </Button>
                  </Grid>
                </Grid>
              ): null
            }
          <ReportCourseModal open={reportCourseModal} handleClose={handleCloseReportCourseModal} course={courses[0]} reporterEmail={user.result.email} />
          </Container>{" "}
        </>
      )}
    </>
  );
};

export default CoursePage;
