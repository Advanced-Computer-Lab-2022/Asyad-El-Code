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
import PendingProblems from "./PendingProblems.js";
import ResolvedProblems from "./ResolvedProblems.js";
import { getTrainee } from "../../actions/individualTrainees";
import { getUnresolvedProblems, getResolvedProblems } from "../../api/problem.js";
const Profile = () => {
  const [page, setPage] = useState("myProfile");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrainee());
  }, []);
  const trainee = useSelector((state) => state?.individualTrainee);
  const [unResolvedProblems, setUnResolvedProblems] = useState([]);
  const [resolvedProblems, setResolvedProblems] = useState([]);
  console.log("I AM THE TRAINEEEEE", trainee);
  console.log("first character of trainee", trainee.firstName);
  return (
    <Grid
      container
      justifyContent="center"
      marginTop={4}
      sx={{ border: "ActiveBorder" }}
      height={650}
      alignItems="center"
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
        <Grid item marginTop={3} xs={1}>
          <Grid container justifyContent="center">
            <Avatar
              sx={{
                width: 150,
                height: 150,
                bgcolor: "#1C1D1F",
                fontSize: "40px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {trainee.firstName ? (
                <b>
                  {trainee.firstName.charAt(0) + "" + trainee.lastName.charAt(0)}
                </b>
              ) : null}
            </Avatar>
          </Grid>
          <Grid item borderBottom={1} borderColor="silver" width="100%" marginTop={1}>
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
                  <ListItemButton component="a" href="#simple-list"
                    onClick={() => {
                      getResolvedProblems({ "reporterEmail": trainee?.email }).then((res) => {
                        console.log("RES", res.data);
                        setResolvedProblems(res.data);
                        setPage("ResolvedProblems");
                      });
                    }}
                  >
                    <ListItemText
                      primary="Resolved Problems"
                      sx={{ textAlign: "center", lineHeight: 1 }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component="a" href="#asdasds"
                    onClick={() => {
                      console.log("trainee email", trainee?.email);
                      getUnresolvedProblems({ "reporterEmail": trainee?.email }).then((res) => {
                        console.log("RES", res.data);
                        setUnResolvedProblems(res.data);
                        setPage("PendingProblems");
                      });
                    }}
                  >
                    <ListItemText
                      primary="Pending Problems"
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
        height={700}
        marginTop={0}
        overflow="hidden"
      >
        {page === "myProfile" ? (
          <MyProfile trainee={trainee}></MyProfile>
        ) : page === "Payment" ? (
          <Payments></Payments>
        ) : page === "Photo" ? (
          <Photo></Photo>
        ) : page === "PendingProblems" ? (
          <PendingProblems unResolvedProblems={unResolvedProblems}></PendingProblems>
        ) : page === "ResolvedProblems" ? (
          <ResolvedProblems resolvedProblems={resolvedProblems}></ResolvedProblems>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default Profile;
