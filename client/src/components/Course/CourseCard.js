import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import image from "../../images/point.png";
import { Grid, Link } from "@mui/material";
import useStyles from "../../css/course";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

export default function CourseCard({ isCourseInUserCourses }) {
  const course = useSelector((c) => c.courses)[0];
  const { classes } = useStyles();
  const MyInfo = styled(Typography)({
    color: "#757071",
    fontSize: 12,
  });
  console.log("IS HERE COURSE ? : ", isCourseInUserCourses);
  return (
    <Card sx={{ width: 345 }}>
      <CardMedia
        component="img"
        height="240px"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography
          className={classes.coursePrice}
          gutterBottom
          variant="h5"
          component="div"
        >
          ${course.price}
        </Typography>
        <Grid columnSpacing={4} container direction="row">
          <Grid item md={12}>
            {isCourseInUserCourses ? (
              <Button
                fullWidth
                sx={{
                  "&:hover": { backgroundColor: "#2F2B2E" },
                  backgroundColor: "#2F2B2E",
                }}
                variant="contained"
              >
                Go to Course
              </Button>
            ) : (
              <Button
                fullWidth
                sx={{
                  "&:hover": { backgroundColor: "#2F2B2E" },
                  backgroundColor: "#2F2B2E",
                }}
                variant="contained"
              >
                {" "}
                {/* TODO Checking if he has the course */}
                Add to Cart
              </Button>
            )}
          </Grid>

          <Grid mt={2} item md={12}>
            <div className={classes.buyNow}>
              <Typography
                sx={{ fontWeight: "bold", padding: 1, textAlign: "center" }}
                variant="body1"
              >
                {/* TODO Checking if he has the course */}
                Buy Now
              </Typography>
            </div>
          </Grid>
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
