import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import ReviewCard from "./ReviewCard";

export const Reviews = () => {
  return (
    <div style={{ backgroundColor: "#eeeeee", height: "65vh" }}>
      <Container>
        <Typography
          paddingTop={6}
          mb={3}
          gutterBottom
          textAlign="center"
          variant="h4"
        >
          Words of people who learned <b>expert skills and knowledge</b>
          <br />
          and never looked back!
        </Typography>
        <Grid
          columnSpacing={3}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={4}>
            <ReviewCard></ReviewCard>
          </Grid>
          <Grid item xs={4}>
            <ReviewCard></ReviewCard>
          </Grid>
          <Grid item xs={4}>
            <ReviewCard></ReviewCard>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
