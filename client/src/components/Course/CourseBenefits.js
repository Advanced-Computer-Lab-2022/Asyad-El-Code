import { Grid, Typography } from "@mui/material";
import React from "react";
import useStyles from "../../css/course";
import DoneIcon from "@mui/icons-material/Done";
export default function CourseBenefits() {
  const { classes } = useStyles();
  return (
    <div className={classes.courseLearning}>
      <Grid padding={3} rowSpacing={4} container>
        <Grid item md={12}>
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            What you'll learn{" "}
          </Typography>
        </Grid>
        <Grid item sm={12} md={6}>
          <Typography variant="body2">
            <DoneIcon></DoneIcon> Learn physicsdhjsgdhjsgdhjsdhjgss
          </Typography>
        </Grid>
        <Grid item sm={12} md={6}>
          <Typography variant="body2">
            <span>
              <DoneIcon></DoneIcon>
            </span>{" "}
            Learn physicsdhjsgdhjsgdhjsdhjgss
          </Typography>
        </Grid>
        <Grid item sm={12} md={6}>
          <Typography variant="body2">
            <DoneIcon></DoneIcon> Learn physicsdhjsgdhjsgdhjsdhjgss
          </Typography>
        </Grid>
        <Grid item sm={12} md={6}>
          <Typography variant="body2">
            <span>
              <DoneIcon></DoneIcon>
            </span>
            Learn physicsdhjsgdhjsgdhjsdhjgss
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
