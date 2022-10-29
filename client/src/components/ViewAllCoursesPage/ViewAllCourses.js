import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Button, Grid, MenuList, Typography } from "@mui/material";
import * as React from "react";
import MenuAppBar from "../Navbar";
import Slider from "../Slider";
import { CoursesGrid } from "./CoursesGrid";
import { FilterBar } from "./FilterBar";
export default function courses() {
  return (
    <div>
      <MenuAppBar></MenuAppBar>
      <FilterBar></FilterBar>
      <CoursesGrid></CoursesGrid>
      <Grid container justifyContent="center" marginTop="40px"></Grid>
    </div>
  );
}
