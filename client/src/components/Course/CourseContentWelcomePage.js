import { Card, Container, Grid, Typography } from "@mui/material";
import React from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CircularProgressWithLabel from "./CircularProgressWithLabel.js";
import { useState } from "react";
import { useEffect } from "react";

export const CourseContentWelcomePage = ({ progress }) => {
  const [color, setColor] = useState("#000000");
  useEffect(() => {
    if (progress < 50) {
      setColor("#CD7F32");
    } else if (progress < 80) {
      setColor("#C0C0C0");
    } else {
      setColor("#FFD700");
    }
  }, [progress]);

  return (
    <Container>
      <Grid
        container
        height="500px"
        display="flex"
        alignItems="center"
        textAlign="center"
      >
        <Grid item xs={6}>
          <Card sx={{ width: "300px", height: "150px" }}>
            <Typography variant="h6">Pick up Where you left off</Typography>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card
            sx={{
              width: "300px",
              height: "150px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6">Course Grade</Typography>
            <div>
              <CircularProgressWithLabel progress={progress} />
              <EmojiEventsIcon sx={{ fontSize: 50 }} style={{ color: color }} />
            </div>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
