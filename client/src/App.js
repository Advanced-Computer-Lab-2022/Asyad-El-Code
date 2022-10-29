import React from "react";

import { ThemeContext } from "@emotion/react";
import { Stack } from "@mui/system";
import Navbar from "./components/Navbar";
import MenuAppBar from "./components/Navbar";
import Home from "./components/HomePage/Home";
import CourseDetails from "./components/Course/CourseDetails";
export const App = () => {
  return (
    <>
      <MenuAppBar></MenuAppBar>
      <Home></Home>

      {/* {/* <CourseDetails></CourseDetails> */}
    </>
  );
};

export default App;
