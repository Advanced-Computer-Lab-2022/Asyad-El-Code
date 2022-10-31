import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Stack,
    CardActions,
    Button,
    Menu
  } from "@mui/material";
  import React from "react";
  import { useDispatch } from "react-redux";
  import { createCourse } from "../../actions/courses";
  export const CoursePreview = ({ course }) => {
    const dispatch = useDispatch();
  
    const handleClick = () => {
      dispatch(createCourse(course));
    };
  
    return (
      <Card elevation={4} >
        <CardMedia
          component="img"
          // image={course}
        ></CardMedia>
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
          >
            {/* {course.title} */}
            JavaScript for //Here is the title
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* {course.title} */}
            Here is the summary
          </Typography>
          <Stack spacing={1} direction="row">
            //Here is the subject
          </Stack>
          <Typography>What will you learn?</Typography>
          <ul>
            {/* {" "}
            {course.outlines.map((item, index) => {
              return <li>{item.outline}</li>;
            })} */}
            <li>Here is the outlie</li>
          </ul>
          <Typography variant="body1" fontWeight="bold">
            //Here is the price
            {/* {`$ ${course.price}`} */} $j323
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleClick} variant="contained">
            Add Course{" "}
          </Button>
        </CardActions>
      </Card>
    );
  };
  export default CoursePreview;
  