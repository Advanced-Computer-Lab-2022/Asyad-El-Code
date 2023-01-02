import {
  Button,
  Grid,
  Rating,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import {
  getAllInstructorCourses,
  getInstructors,
  getInstructor,
  addRating,
  addReview,
} from "../../actions/instructor";
import LanguageIcon from "@mui/icons-material/Language";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { Stack } from "@mui/system";
//import { useRef } from "react";
import "../../css/card.css";
import { useState } from "react";
import { RatingAndReviewPopup } from "../Course/RatingAndReviewPopup";
import { useParams } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { UdacityCard } from "../ViewAllCoursesPage/AllCourses/UdacityCard/UdacityCard";
import axios from "axios";
const styles = {
  emptyStar: {
    color: "white",
  },
};

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const initialFormState = {
  rating: "",
  review: "",
};

function InstructorPage() {
  const classes = styles;

  const [initialForm, setInitialForm] = useState(initialFormState);
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllInstructorCourses(instructor?._id));
  // }, []);

  const instructors = useSelector((state) => state.instructors);
  console.log("THE INSTRUCTROS", instructors);
  const courses = useSelector((c) => c.courses);
  console.log(courses);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState(0);

  useEffect(() => {
    let avg = 0;
    instructors[0]?.ratings?.forEach((rating) => {
      avg += rating.rating;
    });
    avg /= instructors[0]?.ratings?.length;

    console.log("THE AVG", avg);
    if (!avg) setValue(instructors[0].rating);
    else setValue(avg);
  }, []);

  const handleSubmit = async (rating, review) => {
    if (user?.type === "individualTrainee") {
      console.log("Iam here");
      dispatch(addRating(instructors[0]._id, null, user?.result?._id, rating));
      dispatch(addReview(instructors[0]._id, null, user?.result?._id, review));
    } else if (user?.type === "corporateTrainee") {
      dispatch(addRating(instructors[0]._id, user?.result?._id, null, rating));
      dispatch(addReview(instructors[0]._id, user?.result?._id, null, review));
    }
    handleCancel();
  };

  useEffect(() => {
    dispatch(getInstructor(instructors[0]._id));
  }, [open]);

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      direction="row"
      columnSpacing={3}
      style={{ backgroundColor: "#fafafa" }}
    >
      <Grid
        style={{ backgroundColor: "#1C1D1F" }}
        container
        spacing={0}
        marginTop="5px"
      >
        <Grid item xs={9}>
          <Grid
            item
            alignSelf="center"
            marginBottom="1px"
            marginTop="10px"
            marginLeft="200px"
            mt={5}
            md={8}
          >
            <Typography
              variant="h5"
              sx={{
                fontSize: 25,
                fontFamily: "ui-serif",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Instructor
            </Typography>

            {/* <Grid item xs={12} marginLeft="300px"> */}
            <Typography
              variant="h6"
              sx={{
                fontSize: 40,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "white",
              }}
            >
              {instructors[0]?.userName.toUpperCase()}
            </Typography>
          </Grid>

          <Grid
            container
            direction={"row"}
            spacing={0}
            marginLeft="100px"
            marginTop={2}
          >
            <Grid item xs={0.3} marginLeft="100px">
              <Typography sx={{ fontWeight: "bold", color: "white" }}>
                {instructors[0]?.rating}
              </Typography>
            </Grid>

            <Grid item xs={1.5}>
              <Rating
                precision={0.5}
                readOnly
                value={instructors[0].rating}
              ></Rating>
            </Grid>
          </Grid>

          <Grid
            item
            xs={8}
            justifyContent="center"
            marginLeft="200px"
            marginTop={2}
          >
            <Typography variant="h6" sx={{ fontSize: 20, color: "white" }}>
              About the instructor
            </Typography>
          </Grid>

          <Grid item xs={9} marginLeft="200px">
            <Typography sx={{ color: "white" }}>
              intructor x studied in university of Sed ut perspiciatis unde
              omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
            </Typography>
          </Grid>

          {/* <Grid item xs={0} marginLeft="500px">
              <LanguageIcon />
            </Grid> */}
          <Grid item xs={0} marginLeft="200px" marginTop={3} marginBottom={2}>
            <Typography
              sx={{
                color: "white",
                fontSize: "18px",
                display: "inline-flex",
              }}
            >
              <LanguageIcon /> English{" "}
            </Typography>
          </Grid>

          <Grid item xs={12} marginLeft="200px" marginBottom={5}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#eeeeee",
                color: "black",
              }}
              onClick={handleOpen}
            >
              Rate and review Instructor
            </Button>
            <RatingAndReviewPopup
              ratingOpen={open}
              handleCancelRating={handleCancel}
              handleSubmit={handleSubmit}
            ></RatingAndReviewPopup>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        marginTop="15px"
        rowSpacing={5}
        justifyContent="center"
        marginBottom="30px"
      ></Grid>
    </Grid>
  );
}
export default InstructorPage;
