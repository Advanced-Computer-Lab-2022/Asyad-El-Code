import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAllInstructorCourses,
  filterInstructorCourses,
} from "../../actions/instructor";
import { FilterBar } from "../ViewAllCoursesPage/Filter/FilterBar";
import { CoursesGrid } from "../ViewAllCoursesPage/AllCourses/CoursesGrid";
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
