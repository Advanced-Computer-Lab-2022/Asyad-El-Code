import { Button, Container, Grid, Rating, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import LanguageIcon from "@mui/icons-material/Language";

import useStyles from "../../css/course";
import CourseCard from "./CourseCard";
import Link from "@mui/material/Link";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { styled } from "@mui/material";
import CourseBenefits from "./CourseBenefits";
import CourseContent from "./CourseSections";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTrainee } from "../../actions/individualTrainees";

export const CoursePage = () => {
  const course = useSelector((c) => c.courses)[0];
  console.log("Iam the courseIn The front", course);
  const dispatch = useDispatch();

  const { classes } = useStyles();
  const MyLink = styled(Link)({
    color: "#CDBEFB",
    alignSelf: "center",
  });

  const MyTypography = styled(Typography)({
    color: "white",
  });
  //get the user from localstorage
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log("Iam the user", user);
  //Check if the user has the course in his courses
  useEffect(() => {
    dispatch(getTrainee());
  }, []);

  //get user from redux store
  const individualTrainee = useSelector((state) => state?.individualTrainee);
  console.log("The state is ", individualTrainee);
  console.log(individualTrainee?.courses);

  const isCourseInUserCourses = individualTrainee?.courses?.find(
    (c) => c._id === course._id
  );

  console.log("Iam the isCourseInUserCourses", isCourseInUserCourses);

  return (
    <>
      <div className={classes.root}>
        <Container>
          <Grid columnSpacing={3} direction="row" container>
            <Grid item mt={5} md={8}>
              <MyTypography className={classes.courseTitle} variant="h5">
                {course.title}
              </MyTypography>
              <Typography className={classes.courseSubtitle} variant="h6">
                {course.summary}
              </Typography>

              <Stack spacing={1} direction="row">
                <p className={classes.rating}>{course.rating}</p>
                <Rating
                  precision={0.5}
                  className={classes.rating}
                  defaultValue={parseFloat(course.rating)}
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
                    {course.in}
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
            <CourseContent></CourseContent>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CoursePage;
