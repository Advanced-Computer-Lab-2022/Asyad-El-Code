import React from "react";
import CourseDetails from "./components/Course/CourseDetails";
import { ThemeContext } from "@emotion/react";
import { Stack } from "@mui/system";
import Navbar from "./components/Navbar";
import MenuAppBar from "./components/Navbar";
import Home from "./components/HomePage/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ViewAllCourses from "./components/ViewAllCoursesPage/ViewAllCourses";
export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MenuAppBar></MenuAppBar>
          <Home></Home>
        </Route>
        <Route path="/coursesPageTest">
          <ViewAllCourses></ViewAllCourses>
        </Route>
      </Switch>
    </Router>
  );
};

// export const App = () => {
//   return (
//     <>
//       <MenuAppBar></MenuAppBar>
//       <Home></Home>

//       {/* {/* <CourseDetails></CourseDetails> */}
//     </>
//   );
// };

export default App;
