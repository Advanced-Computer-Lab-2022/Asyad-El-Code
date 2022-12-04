import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import useStyles from "../../css/home";
import SimpleSlider from "../Slider";

export const PopularCourses = () => {
  const { classes } = useStyles();
  return (
    <Grid className={classes.members} container>
      <Grid item>
        <Typography variant="h3">Popular courses</Typography>
        <SimpleSlider></SimpleSlider>
      </Grid>
    </Grid>
  );
};

export default PopularCourses;
