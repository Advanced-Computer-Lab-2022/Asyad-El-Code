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
    List
} from "@mui/material";
import useStyles from "../../css/slider.js";
import { bgcolor, maxWidth, Stack } from "@mui/system";
import { useRef } from "react";
import "../../css/card.css";
import image from "../../images/course.jpeg";
import { useDispatch, useSelector } from "react-redux";


export const Profile = () => {

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    return (
        <Grid container justifyContent="center" marginTop={4} sx={{ border: "ActiveBorder" }} height={700}>
            <Grid item xs={2.5} sx={{ borderStyle: "solid", borderWidth: '1px', borderColor: 'silver' }} mr={0} ml={0}>
                <Grid container width={maxWidth} justifyContent="center" alignContent="center" rowSpacing={2} direction="column">
                    <Grid item marginTop={5} xs={1} >
                        <Avatar sx={{ width: 150, height: 150, bgcolor: "#1C1D1F", fontSize: "40px" }}><b>AH</b></Avatar>
                    </Grid>
                    <Grid item alignSelf="center">
                        <Typography sx={{ fontWeight: "bold" }}>
                            Ahmed Heidar
                        </Typography>
                    </Grid>
                    <Grid item width="auto">
                        <Divider />
                        <nav aria-label="secondary mailbox folders">
                            <List>
                                <ListItem disablePadding sx={{":hover":"background-color:black;transition: 0.7s;"}}>
                                    <ListItemButton >
                                        <ListItemText primary="Profile"  sx={{textAlign:"center",lineHeight:1,accentColor:"black"}}/>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton component="a" href="#simple-list">
                                        <ListItemText primary="Photo"  sx={{textAlign:"center",lineHeight:1}} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton component="a" href="#simple-list">
                                        <ListItemText primary="Payments"  sx={{textAlign:"center",lineHeight:1}} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton component="a" href="#simple-list">
                                        <ListItemText primary="Privacy"  sx={{textAlign:"center",lineHeight:1}} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton component="a" href="#simple-list">
                                        <ListItemText primary="Notifications"  sx={{textAlign:"center",lineHeight:1}} />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </nav>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item height={150} xs={8} sx={{ borderStyle: "solid", borderWidth: '1px', borderColor: 'silver' }}>
            </Grid>
        </Grid>
    )
}