import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import useStyles from "../../css/home";
import SimpleSlider from "../Slider";

export const PopularCourses = () => {
  const { classes } = useStyles();
  return (
    <Grid className={classes.members} container>
      <Grid item>
        <SimpleSlider></SimpleSlider>
      </Grid>
    </Grid>
  );
};

export default PopularCourses;
