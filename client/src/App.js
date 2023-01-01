import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import MenuAppBar from "./components/Navbar/Navbar";
import Home from "./components/HomePage/Home";
import ViewAllCourses from "./components/ViewAllCoursesPage/AllCourses/ViewAllCourses";
import { InstructorCourses } from "./components/Instructor/InstructorCourses";
import { Switch, Route, Redirect } from "react-router-dom";
import Admin from "./components/Admin/Admin.js";
import Exercise from "./components/Instructor/Exercise";
import CoursePage from "./components/Course/CoursePage/CoursePage";
import ScrollToTop from "./components/ScrollToTop";

import MyCourses from "./components/Trainee/MyCourses";

import CourseSteps from "./components/Instructor/CourseSteps";
import Profile from "./components/Profile/Profile";
import { InstructorProfile } from "./components/InstructorPofile/InstructorProfile";
import { Auth } from "./components/Auth/Auth";
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
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTrainee } from "./actions/individualTrainees";
import { getCorporate } from "./actions/corporate";
import { UdacityCard } from "./components/ViewAllCoursesPage/AllCourses/UdacityCard/UdacityCard";
import AdminDashboard from "./components/Admin/Dashboard";

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
  const user = JSON.parse(localStorage.getItem("profile"));

  const individualTrainee = useSelector((c) => c.individualTrainee);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.type === "individualTrainee") {
      dispatch(getTrainee());
    } else if (user?.type === "coorporateTrainee") {
      dispatch(getCorporate());
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop>
        <Switch>
          <Route exact path="/ta">
            <PrimarySearchAppBar></PrimarySearchAppBar>
          </Route>
          <Route exact path="/ha">
            <UdacityCard></UdacityCard>
          </Route>
          <Route exact path="/auth">
            {user ? <Redirect to="/home" /> : <Auth></Auth>}
          </Route>
          <Route exact path="/users/confirmPassword/:id">
            {user?.result ? (
              <Redirect to="/home" />
            ) : (
              <ConfirmPassword></ConfirmPassword>
            )}
          </Route>
          <Route exact path="/test">
            <PersistentDrawerLeft></PersistentDrawerLeft>
          </Route>

          <Route>
            <Navbar></Navbar>
            <Switch>
              <Route exact path={["/home", "/"]}>
                <Home />
              </Route>
              <Route exact path="/viewAll">
                <ViewAllCourses />
              </Route>
              <Route exact path="/instructorpage">
                {user?.type === "instructor" ? (
                  <InstructorCourses></InstructorCourses>
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>

              <Route exact path="/adminPage">
                {user?.type === "administrator" ? (
                  <Admin></Admin>
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>
              <Route exact path="/createCourse">
                {user?.type == "instructor" ? (
                  <CourseSteps></CourseSteps>
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>
              <Route exact path="/course/*">
                <CoursePage></CoursePage>
              </Route>
              <Route exact path="/myCourses">
                {user ? <MyCourses></MyCourses> : <Redirect to="/home" />}
              </Route>
              <Route exact path="/profile">
                {user ? <Profile></Profile> : <Redirect to="/home" />}
              </Route>
              <Route exact path="/ta">
                <Testo></Testo>
              </Route>
              <Route exact path="/success/:courseId/:traineeId">
                {(props) => {
                  const { courseId, traineeId } = props.match.params;
                  if (traineeId === user?.result._id) {
                    return (
                      <SuccessPage
                        courseId={courseId}
                        traineeId={traineeId}
                      ></SuccessPage>
                    );
                  } else {
                    return <Redirect to="/home" />;
                  }
                }}
              </Route>

              <Route exact path="/instructorProfile">
                {user?.type === "instructor" ? (
                  <InstructorProfile></InstructorProfile>
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>

              <Route exact path="/courseRequests">
                {user?.type === "administrator" ? (
                  <CourseRequests></CourseRequests>
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>

              <Route exact path="/reportedProblems">
                {user?.type === "administrator" ? (
                  <Problems></Problems>
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>
              <Route exact path="/pendingProblems">
                {user ? (
                  <PendingProblems></PendingProblems>
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>
              <Route exact path="/dashboard">
                <AdminDashboard></AdminDashboard>
              </Route>
            </Switch>
          </Route>
        </Switch>
      </ScrollToTop>
    </ThemeProvider>
  );
};

export default App;
