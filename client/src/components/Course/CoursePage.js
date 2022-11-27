import { Button, Container, Grid, Rating, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import LanguageIcon from "@mui/icons-material/Language";

import useStyles from "../../css/course";
import CourseCard from "./CourseCard";
import Link from "@mui/material/Link";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { styled } from "@mui/material";
import CourseBenefits from "./CourseBenefits";
import CourseContent from "./CourseSections";
import { useSelector } from "react-redux";

export const CoursePage = () => {
  const course = useSelector((c) => c.courses)[0];
  console.log("Iam the frotnend", course);

  const { classes } = useStyles();
  const MyLink = styled(Link)({
    color: "#CDBEFB",
    alignSelf: "center",
  });

  const MyTypography = styled(Typography)({
    color: "white",
  });
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
              <CourseCard></CourseCard>
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
