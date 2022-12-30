import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, Button, InputAdornment, Link, SvgIcon } from "@mui/material";
import { CssBaseline, Grid, TextField } from "@mui/material";
import useStyles from "../../css/navbar";
import {
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Autocomplete,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { US, EG, CA, SA, GB, DE, CN, AE } from "country-flag-icons/react/3x2";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencyRates } from "../../actions/currencyRates";
import { changeSelectedCountry } from "../../actions/selectedCountry";
import { useHistory } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import { Link as DownloadLink } from "react-router-dom";

import "../Header.css";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { getCourse, getCourses } from "../../actions/courses";
import * as courseApi from "../../api/course";
import DropDownMenuProfile from "./DropDownProfileMenu";
import SearchIcon from "@mui/icons-material/Search";
export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [country, setCountry] = React.useState("");
  const open = anchorEl;
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [courses, setCourses] = useState([]);

  const fetchAllCourses = async () => {
    const { data } = await courseApi.fetchCourses();
    setCourses(data);
  };
  useEffect(() => {
    fetchAllCourses();
  }, []);

  const [user, setUser] = useState(parseJson());
  // IMPORTANT TODO We can use here a simple API to get the courses
  console.log("Iam the courses ", courses);
  const rates = useSelector((state) => state.currencyRates);

  const [selected, setSelected] = useState("");
  const selectedCourse = courses?.find((c) => c.title === selected);
  useEffect(() => {
    dispatch(getCurrencyRates());
  }, []);

  const history = useHistory();

  const handleSelect = (courseId, courseTitle) => {
    if (courseTitle === undefined) return;
    if (courseId === undefined) return;
    dispatch(getCourse(courseId, history, courseTitle));
  };
  const handleCountry = (event) => {
    console.log(event.target.value);
    setCountry(event.target.value);
    dispatch(changeSelectedCountry(event.target.value));
  };

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
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/home");
    setUser(null);
  };

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
                opacity: 0.5,
                width: 300,
                height: 3,
                mb: 5,
                //INeed you to remove the autocomplete border
                "& .MuiAutocomplete-inputRoot": {
                  border: "none",
                },
                "& .MuiAutocomplete-input": {
                  border: "none",
                },
                "& .MuiAutocomplete-input:first-child": {
                  border: "none",
                },
                "& .MuiAutocomplete-inputAdornmentPositionStart": {
                  border: "none",
                },
                "& .MuiAutocomplete-inputAdornment": {
                  border: "none",
                },
                //Then set a border to my autocomplete to be of radius 10px and gray color
                "& .MuiAutocomplete-inputRoot": {
                  border: "1px solid gray",
                  borderRadius: "40px",
                  border: "none",
                  backgroundColor: "#555555",
                },
                "& .MuiAutocomplete-input": {
                  border: "1px solid gray",
                  borderRadius: "40px",
                  border: "none",
                  backgroundColor: "#555555",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  InputLabelProps={{
                    className: "text_label",
                  }}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <SearchIcon />
                  //     </InputAdornment>
                  //   ),
                  // }}
                  sx={{
                    input: {
                      height: 2,
                      width: "400px",
                      color: "aqua",
                      mb: 1,
                    },
                  }}
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
                  <MenuItem value={"Egypt"}>
                    <EG title="Egypt" width={20} st />
                    <span style={{ marginLeft: "10px" }}>Egypt</span>
                  </MenuItem>
                  <MenuItem value={"Canada"}>
                    <CA title="Canada" width={20} />
                    <span style={{ marginLeft: "10px" }}>Canada</span>
                  </MenuItem>
                  <MenuItem value={"USA"}>
                    <US title="USA" width={20} />
                    <span style={{ marginLeft: "10px" }}>USA</span>
                  </MenuItem>
                  <MenuItem value={"Germany"}>
                    <DE title="EUR" width={20} />
                    <span style={{ marginLeft: "10px" }}>Germany</span>
                  </MenuItem>
                  <MenuItem value={"KSA"}>
                    <SA title="USA" width={20} />
                    <span style={{ marginLeft: "10px" }}>KSA</span>
                  </MenuItem>
                  <MenuItem value={"UAE"}>
                    <AE title="USA" width={20} />
                    <span style={{ marginLeft: "10px" }}>UAE</span>
                  </MenuItem>
                  <MenuItem value={"UK"}>
                    <GB title="USA" width={20} />
                    <span style={{ marginLeft: "10px" }}>UK</span>
                  </MenuItem>
                  <MenuItem value={"China"}>
                    <CN title="USA" width={20} />
                    <span style={{ marginLeft: "10px" }}>China</span>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {user?.result ? (
              //Create avatar
              <>
                {/* <Grid container>
                  <Grid item>
                    <Link onClick={() => logout()}>Logout</Link>
                  </Grid> */}
                <Grid item>
                  <DropDownMenuProfile
                    logout={logout}
                    user={user}
                  ></DropDownMenuProfile>
                </Grid>
                {/* </Grid> */}
              </>
            ) : (
              <>
                <Grid alignSelf="center" item>
                  <MyLink href="/auth" underline="none">
                    Login
                  </MyLink>
                </Grid>
                <Grid alignSelf="center" item>
                  <MyLink href="/auth" color="white" underline="none">
                    Sign Up
                  </MyLink>
                </Grid>
              </>
            )}
          </Grid>
          <div>
            <SearchIcon fontSize="100"></SearchIcon>
          </div>
          {/* <DownloadLink to="/files/myfi22le.pdf" target="_blank" download>
            Download
          </DownloadLink>
          <Button
            onClick={() => history.push("/courseContent")}
            variant="outlined"
            className={classes.navButtons}
          >
            Course content
          </Button> */}
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
