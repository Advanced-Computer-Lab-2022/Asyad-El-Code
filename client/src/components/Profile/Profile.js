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
  CircularProgress,
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
import Reviews from "./Reviews.js";
import * as instructorApi from "../../api/instructor";
import {
  getUnresolvedProblems,
  getResolvedProblems,
} from "../../api/problem.js";
import { getLoggedUser } from "../../actions/auth.js";
const Profile = () => {
  const [page, setPage] = useState("myProfile");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.authReducer);
  const [unResolvedProblems, setUnResolvedProblems] = useState([]);
  const [resolvedProblems, setResolvedProblems] = useState([]);
  const [userNames, setUserNames] = useState([]);
  // const [instructor, setInstructor] = useState([]);
  let instructor = {};
  const getUserNames = async (instructorId) => {
    console.log("HIMAMA", instructorId);
    const { data } = await instructorApi.getUserNames(instructorId);
    console.log(data);
    setUserNames(data);
    console.log(userNames);
  };
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(getLoggedUser(user?.result?._id));
  }, [page]);

  console.log(page);

  if (user?.type === "individualTrainee") {
    if (auth?.isloading) {
      return <CircularProgress />;
    } else {
      let trainee = auth?.authData?.result;
      if (trainee === undefined) {
        trainee = auth?.authData?.user;
      }
      if (trainee === undefined) {
        trainee = auth?.authData;
      }
      return (
        <Grid
          container
          justifyContent="start"
          marginTop={4}
          sx={{
            border: "ActiveBorder",
            borderWidth: "1px",
            borderColor: "silver",
            borderBottom: "1",
          }}
          height={650}
          alignItems="start"
          overflow={"auto"}
        >
          <Grid
            item
            xs={2.5}
            sx={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "silver",
              borderBottom: "none",
            }}
            mr={0}
            ml={0}
            container
            justifyContent="center"
            direction="column"
            rowSpacing={2}
            alignItems="center"
            minheight={700}
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
                      {trainee.firstName.charAt(0).toUpperCase() +
                        "" +
                        trainee.lastName.charAt(0).toUpperCase()}
                    </b>
                  ) : null}
                </Avatar>
              </Grid>
              <Grid
                item
                borderBottom={1}
                borderColor="silver"
                width="100%"
                marginTop={1}
              >
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
                    {/* <ListItem disablePadding>
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
                    </ListItem> */}
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          setPage("Payment");
                        }}
                      >
                        <ListItemText
                          primary="Wallet"
                          sx={{ textAlign: "center", lineHeight: 1 }}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        component="a"
                        href="#simple-list"
                        onClick={() => {
                          getResolvedProblems({
                            reporterEmail: trainee?.email,
                          }).then((res) => {
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
                      <ListItemButton
                        component="a"
                        href="#asdasds"
                        onClick={() => {
                          getUnresolvedProblems({
                            reporterEmail: trainee?.email,
                          }).then((res) => {
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
            sx={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "silver",
            }}
            minheight={700}
            marginTop={0}
            paddingTop={0}
            overflow="hidden"
          >
            {page === "myProfile" ? (
              <MyProfile trainee={trainee}></MyProfile>
            ) : page === "Payment" ? (
              <Payments wallet={trainee?.wallet}></Payments>
            ) : page === "Photo" ? (
              <Photo></Photo>
            ) : page === "PendingProblems" ? (
              <PendingProblems
                unResolvedProblems={unResolvedProblems}
              ></PendingProblems>
            ) : page === "ResolvedProblems" ? (
              <ResolvedProblems
                resolvedProblems={resolvedProblems}
              ></ResolvedProblems>
            ) : page === "password" ? (
              <Password userId={user.result._id}></Password>
            ) : null}
          </Grid>
        </Grid>
      );
    }
  } else if (user?.type === "instructor") {
    if (auth?.isloading) {
      return <CircularProgress />;
    } else {
      instructor = auth?.authData.result;
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
            sx={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "silver",
            }}
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
                      {instructor.firstName.charAt(0) +
                        "" +
                        instructor.lastName.charAt(0)}
                    </b>
                  ) : null}
                </Avatar>
              </Grid>
              <Grid
                item
                borderBottom={1}
                borderColor="silver"
                width="100%"
                marginTop={1}
              >
                <Typography sx={{ fontWeight: "bold" }} textAlign="center">
                  {instructor?.firstName !== null &&
                  instructor?.lastName !== null ? (
                    <>
                      {instructor?.firstName} {instructor?.lastName}
                    </>
                  ) : instructor?.firstName !== null ? (
                    <>{instructor?.firstName}</>
                  ) : instructor?.lastName !== null ? (
                    <>{instructor?.lastName}</>
                  ) : (
                    <>{instructor?.email}</>
                  )}
                </Typography>
              </Grid>
              <Grid
                item
                borderBottom={1}
                borderColor="silver"
                width="100%"
                marginTop={1}
                textAlign="center"
              >
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
                          getUserNames(instructor?._id).then(() => {
                            setPage("Reviews");
                          });
                        }}
                      >
                        <ListItemText
                          primary="Reviews"
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
                          primary="Wallet"
                          sx={{ textAlign: "center", lineHeight: 1 }}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        component="a"
                        href="#simple-list"
                        onClick={() => {
                          getResolvedProblems({
                            reporterEmail: instructor?.email,
                          }).then((res) => {
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
                      <ListItemButton
                        component="a"
                        href="#asdasds"
                        onClick={() => {
                          getUnresolvedProblems({
                            reporterEmail: instructor?.email,
                          }).then((res) => {
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
            sx={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "silver",
            }}
            minheight={700}
            marginTop={0}
            paddingTop={0}
            overflow="hidden"
          >
            {page === "myProfile" ? (
              <Instructor instructor={instructor}></Instructor>
            ) : page === "Payment" ? (
              <Payments wallet={instructor?.wallet}></Payments>
            ) : page === "Photo" ? (
              <Photo></Photo>
            ) : page === "PendingProblems" ? (
              <PendingProblems
                unResolvedProblems={unResolvedProblems}
              ></PendingProblems>
            ) : page === "ResolvedProblems" ? (
              <ResolvedProblems
                resolvedProblems={resolvedProblems}
              ></ResolvedProblems>
            ) : page === "password" ? (
              <Password userId={user.result._id}></Password>
            ) : page === "Reviews" ? (
              <Reviews instructor={instructor} userNames={userNames}></Reviews>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      );
    }
  } else {
    return <Grid>hi</Grid>;
  }
};

export default Profile;
