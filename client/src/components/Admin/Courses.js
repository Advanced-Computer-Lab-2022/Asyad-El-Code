import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCourses } from "../../actions/courses";
import { Typography } from "@mui/material";
import { CoursesGrid } from "./CoursesGrid";

export const Courses = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, []);

  return (
    <div>
      <CoursesGrid></CoursesGrid>
    </div>
  );
};
