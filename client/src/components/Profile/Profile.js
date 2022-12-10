import React, { Component, useEffect, useState } from "react";
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
  Grid,
  Avatar,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  List,
  Input,
  FormControl,
  InputLabel,
  FormGroup,
} from "@mui/material";
import useStyles from "../../css/slider.js";
import { useRef } from "react";
import "../../css/card.css";
import image from "../../images/course.jpeg";
import MyProfile from "./MyProfile.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Admin from "../Admin/Admin.js";
import Payments from "./Payments.js";
import Photo from "./Photo.js";
import { getTrainee } from "../../actions/individualTrainees";
const Profile = () => {
  const [page, setPage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrainee());
  }, []);
  const trainee = useSelector((state) => state?.individualTrainee);

  console.log("I AM THE TRAINEEEEE", trainee);
  console.log("first character of trainee", trainee.firstName);
  return (
    // <h1>{trainee.firstName.charAt(0)}</h1>

    <Grid
      container
      justifyContent="center"
      marginTop={4}
      sx={{ border: "ActiveBorder" }}
      height={700}
    >
      <Grid
        item
        xs={2.5}
        sx={{ borderStyle: "solid", borderWidth: "1px", borderColor: "silver" }}
        mr={0}
        ml={0}
        container
        justifyContent="center"
        direction="column"
        rowSpacing={2}
        alignItems="center"
      >
        <Grid item marginTop={5} xs={1}>
          <Avatar
            sx={{
              width: 150,
              height: 150,
              bgcolor: "#1C1D1F",
              fontSize: "40px",
            }}
          >
            {trainee.firstName ? (
              <b>
                {trainee.firstName.charAt(0) + "" + trainee.lastName.charAt(0)}
              </b>
            ) : null}
          </Avatar>

          <Grid item borderBottom={1} borderColor="silver" width="100%">
            <Typography sx={{ fontWeight: "bold" }} textAlign="center">
              {trainee.firstName} {trainee.lastName}
            </Typography>
          </Grid>
          <Grid item width="100%">
            <nav aria-label="secondary mailbox folders">
              <List>
                <ListItem disablePadding>
                  <ListItemButton component="a" href="/myCourses">
                    <ListItemText
                      primary="Courses"
                      sx={{
                        textAlign: "center",
                        lineHeight: 1,
                        accentColor: "black",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setPage("myProfile");
                    }}
                  >
                    <ListItemText
                      primary="Profile"
                      sx={{ textAlign: "center", lineHeight: 1 }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setPage("Photo");
                    }}
                  >
                    <ListItemText
                      primary="Photo"
                      sx={{ textAlign: "center", lineHeight: 1 }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setPage("Payment");
                    }}
                  >
                    <ListItemText
                      primary="Payments"
                      sx={{ textAlign: "center", lineHeight: 1 }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component="a" href="#simple-list">
                    <ListItemText
                      primary="Notifications"
                      sx={{ textAlign: "center", lineHeight: 1 }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component="a" href="#simple-list">
                    <ListItemText
                      primary="Close Account"
                      sx={{ textAlign: "center", lineHeight: 1 }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        xs={8}
        sx={{ borderStyle: "solid", borderWidth: "1px", borderColor: "silver" }}
      >
        {page === "myProfile" ? (
          <MyProfile trainee={trainee}></MyProfile>
        ) : page === "Payment" ? (
          <Payments></Payments>
        ) : page === "Photo" ? (
          <Photo></Photo>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default Profile;
