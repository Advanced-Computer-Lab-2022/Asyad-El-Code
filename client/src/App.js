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
export const App = () => {
  return (
    <>
      <MenuAppBar></MenuAppBar>
      <Home></Home>
    </>
  );
};

export default App;
