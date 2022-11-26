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
import { MyCourses } from "./components/Trainee/MyCourses";
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
          <CourseStructure></CourseStructure>
        </Route>
        <Route path="/adminPage">
          <Admin></Admin>
        </Route>
        <Route path="/myCourses">
          <MyCourses></MyCourses>
        </Route>
      </Switch>

      {/* <CourseDetails></CourseDetails> */}

      {/* {/* <CourseDetails></CourseDetails> */}
    </>
  );
};

export default App;
