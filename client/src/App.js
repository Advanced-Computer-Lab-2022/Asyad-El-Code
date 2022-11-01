import React from "react";
import CourseDetails from "./components/Course/CourseDetails";
import { ThemeContext } from "@emotion/react";
import { Stack } from "@mui/system";
import Navbar from "./components/Navbar";
import MenuAppBar from "./components/Navbar";
import Home from "./components/HomePage/Home";
import ViewAllCourses from "./components/ViewAllCoursesPage/ViewAllCourses";
import { FilterBar } from "./components/ViewAllCoursesPage/FilterBar";
import { InstructorCourses } from "./components/Instructor/InstructorCourses";

import CourseStructure from "./components/Instructor/CourseStructure";
import Exercise from "./components/Instructor/Exercise";
export const App = () => {
  return (
    <>
      {/* <MenuAppBar></MenuAppBar>
      <Home></Home> */}
      <CourseStructure></CourseStructure>

      {/* {/* <CourseDetails></CourseDetails> */}
    </>
  );
};


export default App;