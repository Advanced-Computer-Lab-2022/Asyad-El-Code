import React from "react";
import {
  AppBar,
  CssBaseline,
  Grid,
  styled,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { ThemeContext } from "@emotion/react";
import { Stack } from "@mui/system";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
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

export default App;
