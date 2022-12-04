import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Divider,
  Chip,
} from "@mui/material";
import React from "react";

export const CoursePreview = ({ course }) => {

  return (
    <Grid container
      maxWidth="100%"
      margin="30px"
      direction="row"
      justifyContent="center"
      alignItems="center">
      <Grid item sm={2}>
      </Grid>

      <Grid item sm={8}>
        <Card sx={{ minWidth: 275 }}>
          <CardHeader title={course.title} subheader={<Typography sx={{ backgroundColor: "#1C1D1F", color: "white" }}>{course.subject}</Typography>} sx={{ backgroundColor: "#1C1D1F", color: "white" }} />
          <CardContent>
            <Grid container
              maxWidth="100%"
              direction="row"
              justifyContent="center"
              alignItems="center">
              <Grid item sm={5} >
                <CardMedia component="img" width="250" height="250" image={course.image} alt="Course Image" />
              </Grid>
              <Grid item sm={1}></Grid>
              <Grid item sm={6}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Course Description
                </Typography>
                <Typography sx={{ fontSize: 15, color: "#1c1d1f" }} component="div">
                  {course.summary}
                  <br />
                  <br />
                </Typography>
                <Divider />
                <Grid container maxWidth="100%" direction="row" justifyContent="center" alignItems="center" marginTop={2}>
                  <Grid item sm={4}>
                    <Chip label={course.duration + " Hrs"} variant="outlined"></Chip>
                  </Grid>
                  <Grid item sm={4}>
                    <Chip label={"$" + course.price} variant="outlined"></Chip>
                  </Grid>
                  <Grid item sm={4}>
                    <Chip label={course.language} variant="outlined"></Chip>
                  </Grid>
                </Grid>

              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item sm={2}>
      </Grid>
    </Grid>
  );
};
export default CoursePreview;
