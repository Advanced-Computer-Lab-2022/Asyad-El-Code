import React from "react";
import Navbar from "./components/Navbar";
import MenuAppBar from "./components/Navbar";
import Home from "./components/HomePage/Home";
import ViewAllCourses from "./components/ViewAllCoursesPage/ViewAllCourses";
import { InstructorCourses } from "./components/Instructor/InstructorCourses";
import { Switch, Route } from "react-router-dom";
import CourseStructure from "./components/Instructor/CourseStructure";
import Admin from "./components/Admin/Admin.js";
import Exercise from "./components/Instructor/Exercise";
import CourseSteps from "./components/Instructor/CourseSteps";
export const App = () => {
  return (
    <>
      {/* <MenuAppBar></MenuAppBar>
      <Home></Home> */}
      <Navbar></Navbar>


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
        <Route exact path="/createCourse">
          <CourseSteps></CourseSteps>
        </Route>
        <Route path="/adminPage">
          <Admin></Admin>
        </Route>
      </Switch>

      {/* <CourseDetails></CourseDetails> */}

      {/* {/* <CourseDetails></CourseDetails> */}
    </>
  );
};

export default App;
