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
import CoursePage from "./components/Course/CoursePage/CoursePage";
import ScrollToTop from "./components/ScrollToTop";
import InstructorPage from "./components/Instructor/instructorPage";
import MyCourses from "./components/Trainee/MyCourses";

import CourseSteps from "./components/Instructor/CourseSteps";
import Profile from "./components/Profile/Profile";
import { InstructorProfile } from "./components/InstructorPofile/InstructorProfile";
import { Auth } from "./components/Auth/Auth";
import SplashScreen from "./components/Splash/test.js";
import { ConfirmPassword } from "./components/Auth/SendEmail";
import { createTheme, ThemeProvider } from "@mui/material";
import PersistentDrawerLeft from "./components/Course/CourseContents/CourseContents";
import Testo from "./components/Trainee/test";
import { SuccessPage } from "./components/Trainee/SuccessPage";
import CourseRequests from "./components/Admin/CourseRequest";
import Problems from "./components/Admin/Problems";
import PendingProblems from "./components/Profile/PendingProblems";
import PrimarySearchAppBar from "./components/Navbar/tst";
import { CourseWelcome } from "./components/Course/CourseContents/CourseWelcome";
import CardCourse from "./components/Course/PopularCourses/CourseCard";
import { CE } from "./components/Course/CourseContents/Certificate/Certificate";

import RequestAccess from "./components/RequestAccess";
const theme = createTheme({
  palette: {
    primary: {
      main: "#1C1D1F",
    },
    secondary: {
      main: "#f50057",
    },
    grey: {
      main: "#eeeeee",
    },
  },
});
export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop>
        <Switch>
          <Route exact path="/ta">
            <PrimarySearchAppBar></PrimarySearchAppBar>
          </Route>
          <Route exact path="/ha">
            <CE></CE>
          </Route>
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
          <Route exact path="/instructorProfile">
            <InstructorPage></InstructorPage>
          </Route> */}

          <Route>
            <Navbar></Navbar>
            <RequestAccess></RequestAccess>

            {/* <Switch>
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
              <Route exact path="/ta">
                <Testo></Testo>
              </Route>
              <Route exact path="/success/:courseId">
                <SuccessPage></SuccessPage>
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
              <Route exact path="/pendingProblems">
                <PendingProblems></PendingProblems>
              </Route>
            </Switch>
          </Route>
        </Switch>
      </ScrollToTop>
    </ThemeProvider>
  );
};

export default App;
