import React from "react";

import { ThemeContext } from "@emotion/react";
import { Stack } from "@mui/system";
import Navbar from "./components/Navbar";
import MenuAppBar from "./components/Navbar";
import Home from "./components/HomePage/Home";
import CourseDetails from "./components/Course/CourseDetails";
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
