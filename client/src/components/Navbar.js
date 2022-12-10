import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, Button, InputAdornment, Link, SvgIcon } from "@mui/material";
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
import { changeSelectedCountry } from "../actions/selectedCountry";
import { useHistory } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import { Link as DownloadLink } from "react-router-dom";

import "./Header.css";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { getCourse, getCourses } from "../actions/courses";
export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [country, setCountry] = React.useState("");
  const open = anchorEl;
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const { isLoading, courses } = useSelector((state) => state.courses);
  console.log("Iam the courses ", courses);
  console.log("Iam the isLoading State ", isLoading);

  const rates = useSelector((state) => state.currencyRates);
  const [selected, setSelected] = useState("");
  const selectedCourse = courses?.find((c) => c.title === selected);
  useEffect(() => {
    dispatch(getCurrencyRates());
  }, [country]);

  const history = useHistory();

  const handleSelect = (courseId, courseTitle) => {
    dispatch(getCourse(courseId, history, courseTitle));
  };
  const handleCountry = (event) => {
    console.log(event.target.value);
    setCountry(event.target.value);
    dispatch(changeSelectedCountry(event.target.value));
  };
  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const MyLink = styled(Link)({
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  });

  function parseJson() {
    try {
      return JSON.parse(localStorage.getItem("profile"));
    } catch (ex) {
      return "";
    }
  }
  const user = parseJson();

  return (
    <CssBaseline>
      <AppBar className={classes.appBar} position="sticky">
        <Toolbar>
          <MyLink underline="none" href="/home">
            Home
          </MyLink>
          {/* <Typography color="black" variant="h6" component="div">
              Logo
            </Typography> */}

          <MyLink sx={{ ml: 4, mr: 3 }} href="/viewAll" underline="none">
            Explore
          </MyLink>

          <div className={classes.headerOptions}>
            <Autocomplete
              open={openMenu}
              onChange={(event, value) => setSelected(value)}
              onSelect={() =>
                handleSelect(selectedCourse?._id, selectedCourse?.title)
              }
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
              options={courses?.map((course) => course.title)}
              sx={{
                width: 300,
                borderRadius: 1,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "aqua",
                opacity: 0.5,
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Courses"
                  InputLabelProps={{
                    className: "text_label",
                  }}
                  sx={{ input: { color: "white" } }}
                />
              )}
            />
          </div>
          {/* <Button
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
                history.push("/coursePage");
              }}
              className={classes.instructor}
              variant="outlined"
            >
              coursePage
            </Button>

            <Button
              onClick={() => {
                history.push("/adminPage");
              }}
              variant="outlined"
              className={classes.admin}
            >
              Admin
            </Button> */}
          <Grid spacing={2} container className={classes.rightSection}>
            <Grid item xs={2}>
              <FormControl fullWidth size="small">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={country}
                  onChange={handleCountry}
                  displayEmpty
                  renderValue={(value) => {
                    return (
                      <Box color="#FFFFFF" sx={{ display: "flex", gap: 1 }}>
                        <SvgIcon color="#FFFFFF">
                          <LanguageIcon color="#FFFFFF" />
                        </SvgIcon>
                        {value}
                      </Box>
                    );
                  }}
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

            {user?.result ? (
              //Create avatar
              <Grid item>
                <Link href="/profile">
                  <Avatar alt={user?.result?.name}>
                    {user?.result?.firstName.charAt(0)}
                  </Avatar>
                </Link>
              </Grid>
            ) : (
              <>
                <Grid alignSelf="center" item>
                  <MyLink href="#" underline="none">
                    Login
                  </MyLink>
                </Grid>
                <Grid alignSelf="center" item>
                  <MyLink color="white" underline="none">
                    Sign Up
                  </MyLink>
                </Grid>
              </>
            )}
          </Grid>
          <DownloadLink to="/files/myfi22le.pdf" target="_blank" download>
            Download
          </DownloadLink>
          <Button
            onClick={() => history.push("/courseContent")}
            variant="outlined"
            className={classes.navButtons}
          >
            Course content
          </Button>
          {/* <Button
              onClick={() => history.push("/createcourse")}
              variant="contained"
            >
              Create course
            </Button> */}
        </Toolbar>
      </AppBar>
    </CssBaseline>
  );
}
