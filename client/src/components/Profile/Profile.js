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
  CircularProgress
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
import Password from "./Password.js";
import Instructor from "./Instructor.js";
import { getUnresolvedProblems, getResolvedProblems } from "../../api/problem.js";
const Profile = () => {
  const [page, setPage] = useState("myProfile");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.authReducer);
  console.log("the auth", auth);
  const [unResolvedProblems, setUnResolvedProblems] = useState([]);
  const [resolvedProblems, setResolvedProblems] = useState([]);
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log("the user", user);
  if (user?.type === "individualTrainee") {
    if (auth?.isloading) {
      return <CircularProgress />
    } else {
      console.log("the auth", auth);
      let trainee = auth?.authData?.result;
      if (trainee === undefined) {
        trainee = auth?.authData;
      }
      if (trainee === undefined) {
        trainee = auth?.authData?.user;
      }
      return (
        <Grid
          container
          justifyContent="start"
          marginTop={4}
          sx={{ border: "ActiveBorder" }}
          height={650}
          alignItems="start"
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
                  {trainee?.firstName ? (
                    <b>
                      {trainee.firstName.charAt(0) + "" + trainee.lastName.charAt(0)}
                    </b>
                  ) : null}
                </Avatar>
              </Grid>
              <Grid item borderBottom={1} borderColor="silver" width="100%" marginTop={1}>
                <Typography sx={{ fontWeight: "bold" }} textAlign="center">
                  {trainee?.firstName} {trainee?.lastName}
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
                          setPage("password");
                        }}
                      >
                        <ListItemText
                          primary="Password"
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
            paddingTop={0}
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
            ) : page === "password" ? (
              <Password userId={user.result._id}></Password>
            ) : null}
          </Grid>
        </Grid>
      );
    }
  } else if (user?.type === "instructor") {
    if (auth?.isloading) {
      return <CircularProgress />
    } else {
      console.log("auth", auth)
      let instructor = auth?.authData.result;
      if (instructor === undefined) {
        instructor = auth?.authData?.user;
      }
      if (instructor === undefined) {
        instructor = auth?.authData;
      }
      return (
        <Grid
          container
          justifyContent="start"
          marginTop={4}
          sx={{ border: "ActiveBorder" }}
          height={650}
          alignItems="start"
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
                  {instructor?.firstName ? (
                    <b>
                      {instructor.firstName.charAt(0) + "" + instructor.lastName.charAt(0)}
                    </b>
                  ) : null}
                </Avatar>
              </Grid>
              <Grid item borderBottom={1} borderColor="silver" width="100%" marginTop={1}>
                <Typography sx={{ fontWeight: "bold" }} textAlign="center">
                  {instructor?.firstName !== null && instructor?.lastName !== null ? <>{instructor?.firstName} {instructor?.lastName}</> : (instructor?.firstName !== null) ? <>{instructor?.firstName}</> : (instructor?.lastName !== null) ? <>{instructor?.lastName}</> : <>{instructor?.email}</>
                  }
                </Typography>
              </Grid>
              <Grid item borderBottom={1} borderColor="silver" width="100%" marginTop={1} textAlign="center" >
                <Rating name="read-only" value={instructor?.rating} readOnly />
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
                          setPage("password");
                        }}
                      >
                        <ListItemText
                          primary="Password"
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
                          getResolvedProblems({ "reporterEmail": instructor?.email }).then((res) => {
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
                          console.log("instructor email", instructor?.email);
                          getUnresolvedProblems({ "reporterEmail": instructor?.email }).then((res) => {
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
            minheight={700}
            marginTop={0}
            paddingTop={0}
            overflow="hidden"
          >
            {page === "myProfile" ? (
              <Instructor instructor={instructor}></Instructor>
            ) : page === "Payment" ? (
              <Payments></Payments>
            ) : page === "Photo" ? (
              <Photo></Photo>
            ) : page === "PendingProblems" ? (
              <PendingProblems unResolvedProblems={unResolvedProblems}></PendingProblems>
            ) : page === "ResolvedProblems" ? (
              <ResolvedProblems resolvedProblems={resolvedProblems}></ResolvedProblems>
            ) : page === "password" ? (
              <Password userId={user.result._id}></Password>
            ) : null}
          </Grid>
        </Grid>
      );
    }
  } else {
    return (
      <Grid>hi</Grid>
    );
  }
};

export default Profile;
