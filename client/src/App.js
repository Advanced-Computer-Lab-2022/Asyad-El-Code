import React from "react";
import { Stack } from "@mui/system";
import Navbar from "./components/Navbar";
import MenuAppBar from "./components/Navbar";
import Home from "./components/HomePage/Home";
import ViewAllCourses from "./components/ViewAllCoursesPage/ViewAllCourses";
import { InstructorCourses } from "./components/Instructor/InstructorCourses";
import Admin from "./components/Admin/Admin.js";
import CourseStructure from "./components/Instructor/CourseStructure";
import Exercise from "./components/Instructor/Exercise";
import PopularCourses from "./components/HomePage/PopularCourses";
import SimpleSlider from "./components/Slider";
import { Switch, Route, Router } from "react-router-dom";
export const App = () => {
  return (
    <>
      <MenuAppBar></MenuAppBar>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/viewAll">
          <ViewAllCourses />
        </Route>
        <Route exact path="/instructorpage">
          <InstructorCourses></InstructorCourses>
        </Route>
        <Route path="/adminPage">
          <Admin></Admin>
        </Route>
      </Switch>

      {/* <CourseDetails></CourseDetails> */}
    </>
  );
};


export default App;


