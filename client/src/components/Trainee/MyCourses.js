import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Rating,
  Typography,
  Modal,
  Box,
  Grid
} from "@mui/material";
import useStyles from "../../css/slider.js";
import { Stack } from "@mui/system";
import { useRef } from "react";
import "../../css/card.css";
import image from "../../images/course.jpeg";



const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
export const MyCourses = () => {
  return (
    <Grid container justifyContent="center" rowSpacing={4} marginBottom={10}>
      <Grid item xs={10} marginTop={5}>
        <Typography variant="h3">My courses</Typography>
      </Grid>
      <Grid item xs={9}>
        <Card sx={{ overFlow: 'hidden', display: "flex" }} >
          <CardMedia sx={{ maxWidth: 500, maxHeight: 300, maxInlineSize: 500, display: "inline-block" }}
            component="img"
            image={image}
          />
          <CardContent sx={{ display: "inline-block", maxWidth: 500 }}>
            <Typography variant="h5" component="div">
              Introduction to Computer Science
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="body2">
              Complete practical and conceptual Java programming course for beginners
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Updated <b>August 2017</b> 8 total hours {bull} 52 lectures
            </Typography>
            <Typography variant="body2" color="text.secondary">
              By <b>Ahmed Heidar</b>
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
      <Grid item xs={9}>
        <Card sx={{ overFlow: 'hidden', display: "flex" }} >
          <CardMedia sx={{ maxWidth: 500, maxHeight: 300, maxInlineSize: 500, display: "inline-block" }}
            component="img"
            image={image}
          />
          <CardContent sx={{ display: "inline-block", maxWidth: 500 }}>
            <Typography variant="h5" component="div">
              Introduction to Computer Science
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="body2">
              Complete practical and conceptual Java programming course for beginners
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Updated <b>August 2017</b> 8 total hours {bull} 52 lectures
            </Typography>
            <Typography variant="body2" color="text.secondary">
              By <b>Ahmed Heidar</b>
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
    </Grid>
  )
}