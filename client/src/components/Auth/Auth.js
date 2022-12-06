import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import RegisterTabs from "./RegisterTabs";

export const Auth = () => {
  return (
    <>
      <Grid container margin={-3} sx={{ height: "830px" }}>
        <Grid
          item
          container
          sx={{ backgroundColor: "#1C1D1F", height: "800px" }}
          justifyContent="center"
          alignItems="center"
          xs={6}
        >
          <Grid item>
            <Typography
              color="white"
              variant="h2"
              fontSize={93}
              fontWeight="bold"
            >
              Start <br /> learning
            </Typography>

            <Typography color="white" variant="h2" fontWeight="1000">
              with aSyad
            </Typography>
          </Grid>
        </Grid>
        <Grid marginTop={13} justifyContent="center" xs={6} item container>
          <Grid item>
            <RegisterTabs></RegisterTabs>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
