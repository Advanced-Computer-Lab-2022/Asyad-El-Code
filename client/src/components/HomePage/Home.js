import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  CardActions,
  Grid,
  Link,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import useStyles from "../../css/home";
import study from "../../images/study.jpeg";
import Members, { PopularCourses } from "./PopularCourses";
import { useDispatch } from "react-redux";
import { getCourses } from "../../actions/courses";

export const Home = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const handleOver = (event) => {
    console.log("HIIISID");
  };

  useEffect(() => {
    dispatch(getCourses());
  }, []);

  return (
    <div>
      <div className={classes.root}>
        <Grid justifyContent="center" container>
          <Grid md={6} spacing={3} item container direction="column">
            <Grid item>
              <Typography sx={{ fontWeight: "400" }} variant="h1">
                Learn without <br /> limits{" "}
              </Typography>
            </Grid>
            <Grid item>
              Start, switch, or advance your career with more than 5,200
              courses,
              <br />
              Professional Certificates, and degrees from world-class
              universities
              <br />
              and companies.
            </Grid>
            <Grid item spacing={1} container direction="row">
              <Grid item>
                <Button
                  sx={{ width: "170px", padding: "20px" }}
                  variant="contained"
                  size="large"
                >
                  Join for Free{" "}
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color={"error"} size="large">
                  Explore Courses{" "}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item auto>
            <img
              onMouseOver={handleOver}
              className={classes.image}
              src={study}
            ></img>
          </Grid>
        </Grid>
      </div>
      <PopularCourses></PopularCourses>
    </div>

    // <>
    //   <div className={classes.container}>
    //     <Grid container rowGap={3}>
    //       <Grid paddingTop="30px" textAlign="center" item sm={12}>
    //         <Typography variant="h2">
    //           <span style={{ fontWeight: "bold", color: "white" }}>
    //             Start learning from <br />
    //           </span>
    //           <span
    //             style={{
    //               color: "#D13228",
    //               fontWeight: "bold",
    //             }}
    //           >
    //             the world’s best institutions
    //           </span>
    //         </Typography>
    //       </Grid>
    //       <Grid
    //         container
    //         alignItems="center"
    //         direction="column"
    //         spacing={0}
    //         justifyContent="center"
    //       >
    //         <Grid item>
    //           <Typography variant="h2">
    //             <TextField
    //               className={classes.searchBar}
    //               variant="filled"
    //               placeholder="Search for courses"
    //             ></TextField>
    //           </Typography>
    //         </Grid>
    //         <Button className="square" variant="contained">
    //           Be one of{" "}
    //         </Button>
    //       </Grid>
    //     </Grid>
    //   </div>

    // </>
  );
};
export default Home;
