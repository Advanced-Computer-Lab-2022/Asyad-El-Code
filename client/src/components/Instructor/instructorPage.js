import { Button, Grid, Rating, Typography, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import {
  getAllInstructorCourses,
  getInstructors,
  getInstructor,
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
import image from "../../images/course.jpeg";
import { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  TextField,
} from "@mui/material";
import { RatingAndReviewPopup } from "../Course/RatingAndReviewPopup";
import { addRating, addReview } from "../../actions/instructor";

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
  const [initialForm, setInitialForm] = useState(initialFormState);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInstructors());
    dispatch(getAllInstructorCourses());
  }, []);
  const instructors = useSelector((c) => c.instructors);
  const instructor = instructors[0];
  const courses = useSelector((c) => c.courses);
  console.log(courses);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState(2);

  const handleSubmit = (rating, review) => {
    console.log(instructor?._id);
    dispatch(
      addRating(instructor?._id, "", "6352c07584a5db1f743a94a6", rating)
    );
    dispatch(
      addReview(instructor?._id, "", "6352c07584a5db1f743a94a6", review)
    );
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  console.log("---------------------------");
  console.log(instructor);
  return (
    <Grid
      container
      direction="row"
      spacing={4}
      marginTop="5px"
      //marginLeft="5px"
      //bgcolor="#253f4b"
    >
      <Grid
        container
        spacing={0}
        marginLeft="30px"
        marginRight="30px"
        marginTop="5px"
        justifyContent="center"
      >
        <Grid item xs={9}>
          <Grid
            container
            spacing={2}
            marginTop="3px"
            marginLeft="230px"
            marginRight="30px"
          >
            <Grid item alignSelf="center" xs={8} marginBottom="1px">
              <Typography
                sx={{
                  fontSize: 25,
                  fontFamily: "ui-serif",
                  color: "#6a6f73",
                  fontWeight: "bold",
                }}
              >
                Instructor
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: 40,
                  fontFamily: "monospace",
                  fontWeight: 700,
                }}
              >
                {instructor?.userName}
              </Typography>
            </Grid>
            <Grid item xs={0}>
              <Typography sx={{ fontWeight: "bold", color: "#F6BE00" }}>
                {instructor?.rating}
              </Typography>
            </Grid>

            <Grid item xs={0}>
              <Rating name="read-only" value={value} readOnly />
            </Grid>
            <Grid item>
              <Typography sx={{ fontWeight: "bold", color: "#C70039" }}>
                (15,0000 ratings)
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Avatar sx={{ width: 200, height: 200 }}> MM </Avatar>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        //marginTop="15px"
        marginLeft="30px"
        marginRight="30px"
        justifyContent="center"
      >
        <Grid item xs={8} justifyContent="center" marginLeft="100px">
          <Typography variant="h6" sx={{ fontSize: 20 }}>
            About the instructor
          </Typography>
        </Grid>

        <Grid item xs={9} marginLeft="220px">
          <Typography>
            intructor x studied in university of Sed ut perspiciatis unde omnis
            iste natus error sit voluptatem accusantium doloremque laudantium,
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
            quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
            voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
            consequuntur magni dolores eos qui ratione voluptatem sequi
            nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
            amet, consectetur, adipisci velit, sed quia non numquam eius modi
            tempora incidunt ut labore et dolore magnam aliquam quaerat
            voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
            ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
            consequatur? Quis autem vel eum iure reprehenderit qui in ea
            voluptate velit esse quam nihil molestiae consequatur, vel illum qui
            dolorem eum fugiat quo voluptas nulla pariatur
          </Typography>
        </Grid>

        <Grid container spacing={1} marginTop="3px" marginLeft="300px">
          <Grid item xs={0} alignSelf="center">
            <LanguageIcon />
          </Grid>
          <Grid item xs={1}>
            <Typography sx={{ color: "#C70039" }}>English</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} marginLeft="300px">
          <Button variant="contained" onClick={handleOpen}>
            Rate and review Instructor
          </Button>
          <RatingAndReviewPopup
            ratingOpen={open}
            handleCancelRating={handleCancel}
            handleSubmit={handleSubmit}
          ></RatingAndReviewPopup>
        </Grid>
      </Grid>

      <Grid container marginLeft="330px" marginTop="15px" rowSpacing={5}>
        <Grid item xs={8}>
          <Typography variant="h6" sx={{ fontSize: "30px" }}>
            Explore my courses
          </Typography>
        </Grid>
        {courses.map((course, index) => {
          return (
            <Grid item xs={9}>
              <Card sx={{ overFlow: "hidden", display: "flex" }}>
                <CardMedia
                  sx={{
                    maxWidth: 500,
                    maxHeight: 300,
                    maxInlineSize: 500,
                    display: "inline-block",
                  }}
                  component="img"
                  image={image}
                />
                <CardContent sx={{ display: "inline-block", maxWidth: 500 }}>
                  <Typography variant="h5" component="div">
                    {course.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} variant="body2">
                    {course.summary}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Updated{" "}
                    <b>
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(new Date(Date.parse(course.releaseDate)))}{" "}
                    </b>
                    {course.duration} total hours {bull} 52 lectures
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    By <b>{course.author}</b>
                  </Typography>
                  <Stack spacing={1} direction="row">
                    <p>4.5</p>
                    <Rating readOnly sx={{ alignItems: "center" }}></Rating>
                    <p style={{ alignSelf: "center" }}></p>
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button size="small">Go To Course</Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
export default InstructorPage;
