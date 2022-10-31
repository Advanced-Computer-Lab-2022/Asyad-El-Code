import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Autocomplete, CssBaseline, Grid, TextField } from "@mui/material";
import useStyles from "../css/navbar";
import { Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  filterByTilteOrSubjectOrInstructor,
  getCourses,
} from "../actions/courses";
import { useEffect } from "react";

export default function ButtonAppBar() {
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = anchorEl;
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const courses = useSelector((c) => c.courses);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleChange = (newValue) => {
    setSearch(newValue);
  };

  return (
    <CssBaseline>
      <AppBar className={classes.appBar} position="sticky">
        <Toolbar>
          <Typography color="black" variant="h6" component="div">
            Logo
          </Typography>

          <Button
            className={classes.courseButton}
            variant="contained"
            color="error"
            onClick={handleClick}
            size="large"
            endIcon={<KeyboardArrowDownIcon></KeyboardArrowDownIcon>}
          >
            Explore
          </Button>

          <Menu
            onClose={handleClose}
            id="resources-menu"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={open}
          >
            <MenuItem onClick={handleClose}>Blog</MenuItem>
            <MenuItem onClick={handleClose}>Blog</MenuItem>
          </Menu>
          <div className={classes.headerOptions}>
            {/* <TextField
              sx={{ backgroundColor: "white", width: "400px" }}
              placeholder="Search for courses"
            ></TextField> */}
            {/* <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={courses.map((course) => course.title)}
              sx={{ width: 300 }}
              onChange={handleChange}
              filterOptions={(options) =>
                options.filter((option) => option.includes("1"))
              }
              value={search}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Search for courses" />
              )}
            /> */}
            <Autocomplete
              open={openMenu}
              onInputChange={(_, value) => {
                if (value.length === 0) {
                  if (openMenu) setOpenMenu(false);
                } else {
                  if (!openMenu) setOpenMenu(true);
                }
              }}
              onClose={() => setOpenMenu(false)}
              options={courses.map((course) => course.title)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Search Courses" />}
            />
          </div>

          <Grid spacing={2} container className={classes.rightSection}>
            <Grid item>
              <Button variant="outlined" className={classes.navButtons}>
                Login
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" className={classes.navButtons}>
                Sign up
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </CssBaseline>
  );
}
