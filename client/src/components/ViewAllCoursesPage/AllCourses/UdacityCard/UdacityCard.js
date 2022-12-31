import {
  Chip,
  Divider,
  Grid,
  Paper,
  Button,
  Typography,
  Card,
  Stack,
  Rating,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PromotionPopUp from "../../PromotionPopUp.js";
import image from "../../../../images/coding.jpeg";
import { getRate } from "../../../util";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCourse } from "../../../../actions/courses";
import FeedbackDialog from "./RatingsAndReviews/FeedbackDialog";

export const UdacityCard = ({ course, type }) => {
  const traineeType = JSON.parse(localStorage.getItem("profile"))?.type;
  const selectedCountry = useSelector((c) => c.selectedCountry);

  const { isLoading, currencyRates } = useSelector(
    (state) => state.currencyRates
  );

  const [openPromotion, setOpenPromotion] = useState(false);
  const dispatch = useDispatch();
  console.log("UDACITY CARD" + " " + course);
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClick = (courseId, courseTitle, scrollType) => {
    // if (type !== "instructor") {
    //   dispatch(getCourse(courseId, history, courseTitle));
    // } else {
    // }

    setOpen(true);
    setScroll(scrollType);
  };

  const definePromotion = () => {
    if (
      type == "instructor" &&
      (traineeType == "instructor" || traineeType == "admin")
    ) {
      return true;
    }
    return false;
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card style={{ width: "600px", height: "430px" }}>
      <Grid
        columnSpacing={2}
        padding={3}
        height="100%"
        width="100%"
        container
        direction="row"
      >
        <Grid
          xs={4}
          sx={{
            //Set a border to the right only to know the limits of the grid
            borderRight: "1px solid black",
            borderColor: "#eeeeee",
            height: "140%",
            padding: "10px",
          }}
          rowSpacing={1}
          item
          container
          direction="column"
        >
          <Grid item>
            <img
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderTopRightRadius: "50px",
                //I want you to cut frrom the top right using ellipse and clippath
                //   clipPath: "ellipse(150% 80% at 0% 90%)",
                // clipPath: "circle(100% at 100% 90%)",
              }}
              src={image}
            ></img>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              style={{
                padding: "12px",
                textTransform: "none",
                backgroundColor: "#205295",
              }}
              variant="contained"
              onClick={() => handleClick(course._id, course.title, "paper")}
            >
              {type === "instructor" ? "Feedback" : "Program Details "}
            </Button>
          </Grid>
          <Grid item>
            <FeedbackDialog
              course={course}
              open={open}
              handleClose={handleClose}
            ></FeedbackDialog>
          </Grid>

          {definePromotion() ? (
            <Grid item>
              <Button
                fullWidth
                style={{
                  padding: "12px",
                  borderColor: "#205295",
                  borderStyle: "solid",
                  borderWidth: "2px",
                  color: "#205295",
                  textTransform: "none",
                }}
                variant="outlined"
                onClick={() => setOpenPromotion(true)}
              >
                {definePromotion()
                  ? "Define Promotion"
                  : traineeType == "individualTrainee" ||
                    traineeType == "corporateTrainee"
                  ? "Enroll Now"
                  : "Download"}
              </Button>
            </Grid>
          ) : null}
        </Grid>
        <Grid rowSpacing={2} item xs={8} container direction="column">
          <Grid item>
            <Chip
              label={course.subject}
              style={{
                fontWeight: "bold",
                backgroundColor: "#eeeeee",
                color: "black",
              }}
              // color="success"
            />
          </Grid>
          <Grid item>
            <Typography variant="h5">{course.title}</Typography>
          </Grid>
          <Grid item></Grid>
          <Grid mt={-1} item>
            <Typography fontSize={17} color="text.secondary" variant="body2">
              {course.price !== course.discountedPrice ? (
                <span style={{ textDecoration: "line-through" }}>
                  {getRate(selectedCountry, currencyRates, course.price)}
                </span>
              ) : null}
              {getRate(selectedCountry, currencyRates, course.discountedPrice)}
              {/* {` ${course.discountedPrice} EGP`} */}
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={12} color="text.secondary" variant="body2">
              Instructor: {course.instructor.name}
            </Typography>
          </Grid>
          <Grid item>
            <Stack
              style={{
                flexDirection: "row",
                alignItems: "center",

                backgroundColor: "#eeeeee",
              }}
              direction="row"
              spacing={2}
              // width="150%"
              padding={2}
            >
              <Rating
                name="read-only"
                style={{ color: "black" }}
                value={parseInt(course.rating)}
                readOnly
                size="small"
              />
              <Typography fontSize={12} variant="body2">
                {course.rating} (1,000+ reviews)
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Typography variant="h7">Course Summary</Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={12} color="text.secondary" variant="body2">
              {course.summary}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <PromotionPopUp
        open={openPromotion}
        setOpen={setOpenPromotion}
        courseId={course._id}
      />
    </Card>
  );
};
