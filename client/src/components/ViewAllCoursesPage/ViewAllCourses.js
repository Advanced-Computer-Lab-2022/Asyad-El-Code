import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Button, Grid, MenuList, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuAppBar from "../Navbar";
import Slider from "../Slider";
import { CoursesGrid } from "./CoursesGrid";
import { FilterBar } from "./FilterBar";
import { useDispatch } from "react-redux";
import { filterCourses, getCourses } from "../../actions/courses";

export const Courses = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, []);
  const handleClick = (e, filterData) => {
    dispatch(filterCourses(filterData));
  };
  return (
    <div>
      <MenuAppBar></MenuAppBar>
      <FilterBar handleClick={handleClick}></FilterBar>
      <CoursesGrid></CoursesGrid>
      <Grid container justifyContent="center" marginTop="40px"></Grid>
    </div>
  );
};
export default Courses;
