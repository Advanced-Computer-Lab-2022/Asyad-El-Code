import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { enrollCourse } from "../../api/individualTrainees";
import { Container } from "@mui/system";
import { Button, CircularProgress, Grid } from "@mui/material";
import { Redirect } from "react-router-dom";
import { getCourse } from "../../actions/courses";
import { useHistory } from "react-router-dom";

export const SuccessPage = () => {
  const [spinner, setSpinner] = useState(true);
  const history = useHistory();

  const { courseId } = useParams();
  useEffect(() => {
    //TODO CHECK IF USER HAS ALREADY THE COURSE
  }, []);
  const user = JSON.parse(localStorage.getItem("profile"));
  //change spinner when component did mount to false after a whilte
  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 3000);
  }, []);
  const dispatch = useDispatch();
  const handleClickCourse = () => {
    enrollCourse(courseId, user?.result?._id);
    history.push("/");
  };

  return (
    <Container>
      <Grid container>
        <Grid mt={30} textAlign="center" item xs={12}>
          <h1>Thank you for your purchase</h1>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <h3>Redirecting to your dashboard</h3>
        </Grid>

        {spinner ? (
          <Grid mt={5} textAlign="center" item xs={12}>
            <CircularProgress
              style={{
                textAlign: "center",
              }}
            ></CircularProgress>
          </Grid>
        ) : (
          <Container
            sx={{
              textAlign: "center",
            }}
            variant="contained"
          >
            <Button onClick={handleClickCourse}>Click here </Button>
          </Container>
        )}
      </Grid>
    </Container>
  );
};
