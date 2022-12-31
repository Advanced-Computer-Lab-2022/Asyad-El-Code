import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Button, Container, Grid, MenuList, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { FilterBar } from "../Filter/FilterBar";
import { useDispatch, useSelector } from "react-redux";
import { filterCourses, getCourses } from "../../../actions/courses";
import { useLocation } from "react-router-dom";
import {
  filterInstructorCourses,
  getAllInstructorCourses,
} from "../../../actions/instructor";
import { CoursesGrid } from "./CoursesGrid";
import { SearchBar } from "./SearchBar";
export const Courses = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("source");
  const user = JSON.parse(localStorage.getItem("profile"));

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
      dispatch(filterInstructorCourses(user.result._id, filterData));
    } else {
      dispatch(filterCourses(filterData));
    }
  };

  return (
    <div style={{ backgroundColor: "#F2F0EF" }}>
      <FilterBar handleClick={handleClick}></FilterBar>

      <CoursesGrid type={search}></CoursesGrid>

      <Grid container justifyContent="center" marginTop="40px"></Grid>
    </div>
  );
};
export default Courses;
