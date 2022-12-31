import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Button, Container, Grid, MenuList, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "../Slider";
import { CoursesGrid } from "./CoursesGrid";
import { FilterBar } from "./FilterBar";
import { useDispatch } from "react-redux";
import { filterCourses, getCourses } from "../../actions/courses";
import { useLocation } from "react-router-dom";
import { getAllInstructorCourses } from "../../actions/instructor";
export const Courses = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("source");
  console.log("search", search);
  console.log("LOCATION PATHNAME", location.pathname);
  console.log("LOCATION SEARCH", location.search);

  const dispatch = useDispatch();
  useEffect(() => {
    if (search === "instructor") {
      dispatch(getAllInstructorCourses());
    } else {
      dispatch(getCourses());
    }
  }, []);

  useEffect(() => {
    if (search === "instructor") {
      dispatch(getAllInstructorCourses());
    } else {
      dispatch(getCourses());
    }
  }, [location.search]);

  const handleClick = (e, filterData) => {
    if (search === "instructor") {
      dispatch(getAllInstructorCourses(filterData));
    } else {
      dispatch(filterCourses(filterData));
    }
  };

  return (
    <div style={{ backgroundColor: "#F2F0EF" }}>
      <FilterBar handleClick={handleClick}></FilterBar>

      <CoursesGrid></CoursesGrid>

      <Grid container justifyContent="center" marginTop="40px"></Grid>
    </div>
  );
};
export default Courses;
