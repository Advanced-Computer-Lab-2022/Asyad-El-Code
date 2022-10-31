import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { CssBaseline, Grid, TextField } from "@mui/material";
import useStyles from "../css/navbar";
import {
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Autocomplete,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { US, EG, CA } from "country-flag-icons/react/3x2";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencyRates } from "../actions/currencyRates";
import { margin } from "@mui/system";
import { changeSelectedCountry } from "../actions/selectedCountry";
import { useHistory } from "react-router-dom";
export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [country, setCountry] = React.useState("");
  const open = anchorEl;
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const courses = useSelector((c) => c.courses);
  const rates = useSelector((state) => state.currencyRates);
  console.log(rates);
  useEffect(() => {
    dispatch(getCurrencyRates());
  }, [country]);

  const history = useHistory();
  const handleClick = (event) => {
    history.push("/viewAll");
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleCountry = (event) => {
    console.log(event.target.value);
    setCountry(event.target.value);
    dispatch(changeSelectedCountry(event.target.value));
  };
  return (
    <CssBaseline>
      <AppBar className={classes.appBar} position="sticky">
        <Toolbar>
          <Button onClick={() => history.push("/")} variant="contained">
            Home
          </Button>
          {/* <Typography color="black" variant="h6" component="div">
            Logo
          </Typography> */}
          <Button
            className={classes.courseButton}
            variant="contained"
            color="error"
            onClick={handleClick}
            size="large"
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
                  if (openMenu) {
                    setOpenMenu(false);
                  }
                } else {
                  if (!openMenu) {
                    setOpenMenu(true);
                  }
                }
              }}
              onClose={() => setOpenMenu(false)}
              options={courses.map((course) => course.title)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Search Courses" />
              )}
            />
          </div>
          <Button
            onClick={() => {
              history.push("/instructorpage");
            }}
            className={classes.instructor}
            variant="outlined"
          >
            Instructor
          </Button>
          <Button
            onClick={() => {
              history.push("/adminPage");
            }}
            variant="outlined"
            className={classes.admin}
          >
            Admin
          </Button>
          <Grid spacing={2} container className={classes.rightSection}>
            <Grid item xs={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={country}
                  label="Country"
                  onChange={handleCountry}
                >
                  <MenuItem value={"EGYPT"}>
                    <EG title="Egypt" width={20} st />
                    <span style={{ marginLeft: "10px" }}>Egypt</span>
                  </MenuItem>
                  <MenuItem value={"CANADA"}>
                    <CA title="Canada" width={20} />
                    <span style={{ marginLeft: "10px" }}>Canada</span>
                  </MenuItem>
                  <MenuItem value={"USA"}>
                    <US title="USA" width={20} />
                    <span style={{ marginLeft: "10px" }}>USA</span>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
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

          <Button
            onClick={() => history.push("/createcourse")}
            variant="contained"
          >
            Create course
          </Button>
        </Toolbar>
      </AppBar>
    </CssBaseline>
  );
}
