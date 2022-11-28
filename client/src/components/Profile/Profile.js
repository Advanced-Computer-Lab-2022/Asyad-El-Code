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
    Grid,
    Avatar,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    List,
    Input, FormControl, InputLabel, FormGroup
} from "@mui/material";
import useStyles from "../../css/slider.js";
import { bgcolor, maxWidth, Stack } from "@mui/system";
import { useRef } from "react";
import "../../css/card.css";
import image from "../../images/course.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { getTrainee } from "../../actions/individualTrainees.js";
import MyProfile from "./MyProfile.js";
import Admin from "../Admin/Admin.js";


export const Profile = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState("myProfile")
    useEffect(() => {
        dispatch(getTrainee())
    }, [page])
    return (
        <Grid container justifyContent="center" marginTop={4} sx={{ border: "ActiveBorder" }} height={700}>
            <Grid item xs={2.5} sx={{ borderStyle: "solid", borderWidth: '1px', borderColor: 'silver' }} mr={0} ml={0}>
                <Grid container width={maxWidth} justifyContent="center" alignItems="center" rowSpacing={2} direction="column">
                    <Grid item marginTop={5} xs={1} >
                        <Avatar sx={{ width: 150, height: 150, bgcolor: "#1C1D1F", fontSize: "40px" }}><b>AH</b></Avatar>
                    </Grid>
                    <Grid item borderBottom={1} borderColor="silver" width="100%">
                        <Typography sx={{ fontWeight: "bold" }} textAlign="center">
                            Ahmed Heidar
                        </Typography>
                    </Grid>
                    <Grid item width="100%">
                        <nav aria-label="secondary mailbox folders">
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton component="a" href="/myCourses">
                                        <ListItemText primary="Courses" sx={{ textAlign: "center", lineHeight: 1, accentColor: "black" }} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => { setPage("myProfile") }}>
                                        <ListItemText primary="Profile" sx={{ textAlign: "center", lineHeight: 1 }} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => { setPage("Photo") }}>
                                        <ListItemText primary="Photo" sx={{ textAlign: "center", lineHeight: 1 }} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton component="a" href="#simple-list">
                                        <ListItemText primary="Payments" sx={{ textAlign: "center", lineHeight: 1 }} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton component="a" href="#simple-list">
                                        <ListItemText primary="Notifications" sx={{ textAlign: "center", lineHeight: 1 }} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton component="a" href="#simple-list">
                                        <ListItemText primary="Close Account" sx={{ textAlign: "center", lineHeight: 1 }} />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </nav>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={8} sx={{ borderStyle: "solid", borderWidth: '1px', borderColor: 'silver' }}>
                {page === "myProfile" ? <MyProfile></MyProfile> : <Admin></Admin>}
            </Grid>
        </Grid>
    )
}