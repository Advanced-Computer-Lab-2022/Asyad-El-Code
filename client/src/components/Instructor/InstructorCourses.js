import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAllInstructorCourses,
  filterInstructorCourses,
} from "../../actions/courses";
import { FilterBar } from "../ViewAllCoursesPage/FilterBar";
import { CoursesGrid } from "../ViewAllCoursesPage/CoursesGrid";
import { Typography } from "@mui/material";

export const InstructorCourses = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllInstructorCourses());
  }, []);
  const handleClick = (e, filterData) => {
    dispatch(filterInstructorCourses(filterData));
  };
  return (
    <div>
      <FilterBar handleClick={handleClick}></FilterBar>
      <Typography variant="h4" gutterBottom>
        My Courses
      </Typography>
      <CoursesGrid></CoursesGrid>
    </div>
  );
};
