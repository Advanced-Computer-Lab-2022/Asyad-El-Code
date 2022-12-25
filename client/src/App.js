import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import MenuAppBar from "./components/Navbar/Navbar";
import Home from "./components/HomePage/Home";
import ViewAllCourses from "./components/ViewAllCoursesPage/ViewAllCourses";
import { InstructorCourses } from "./components/Instructor/InstructorCourses";
import { Switch, Route } from "react-router-dom";
import CourseStructure from "./components/Instructor/CourseStructure";
import Admin from "./components/Admin/Admin.js";
import Exercise from "./components/Instructor/Exercise";
import CoursePage from "./components/Course/CoursePage";
import ScrollToTop from "./components/ScrollToTop";

import MyCourses from "./components/Trainee/MyCourses";

import CourseSteps from "./components/Instructor/CourseSteps";
import Profile from "./components/Profile/Profile";
import { InstructorProfile } from "./components/InstructorPofile/InstructorProfile";
import { Auth } from "./components/Auth/Auth";
import SplashScreen from "./components/Splash/test.js";
import { ConfirmPassword } from "./components/Auth/SendEmail";
import { createTheme, ThemeProvider } from "@mui/material";
import PersistentDrawerLeft from "./components/Course/CourseContents";
import CourseRequests from "./components/Admin/CourseRequest";
import Problems from "./components/Admin/Problems";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1C1D1F",
    },
    secondary: {
      main: "#f50057",
    },
  },
});
export const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop>
        <Switch>
          <Route exact path="/">
            <SplashScreen></SplashScreen>
          </Route>
          <Route exact path="/auth">
            <Auth></Auth>
          </Route>
          <Route exact path="/users/confirmPassword/:id">
            <ConfirmPassword></ConfirmPassword>
          </Route>
          <Route exact path="/test">
            <PersistentDrawerLeft></PersistentDrawerLeft>
          </Route>

          <Route>
            <Navbar></Navbar>
            <Switch>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/viewAll">
                <ViewAllCourses />
              </Route>
              <Route exact path="/instructorpage">
                <InstructorCourses></InstructorCourses>
              </Route>

              <Route exact path="/adminPage">
                <Admin></Admin>
              </Route>
              <Route exact path="/createCourse">
                <CourseSteps></CourseSteps>
              </Route>
              <Route exact path="/course/*">
                <CoursePage></CoursePage>
              </Route>
              <Route exact path="/myCourses">
                <MyCourses></MyCourses>
              </Route>
              <Route exact path="/profile">
                <Profile></Profile>
              </Route>

              <Route exact path="/instructorProfile">
                <InstructorProfile></InstructorProfile>
              </Route>

              <Route exact path="/courseRequests">
                <CourseRequests></CourseRequests>
              </Route>

              <Route exact path="/reportedProblems">
                <Problems></Problems>
              </Route>
            </Switch>
          </Route>
        </Switch>
      </ScrollToTop>
    </ThemeProvider>
  );
};

export default App;
