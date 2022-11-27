import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, InputAdornment, Link, SvgIcon } from "@mui/material";
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
import { US, EG, CA, SA, GB, DE, CN, AE } from "country-flag-icons/react/3x2";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencyRates } from "../actions/currencyRates";
import { changeSelectedCountry } from "../actions/selectedCountry";
import { useHistory } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";

import "./Header.css";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
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

  const MyLink = styled(Link)({
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  });
  return (
    <CssBaseline>
      <AppBar className={classes.appBar} position="sticky">
        <Toolbar>
          <MyLink underline="none" href="/">
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
                  <MenuItem value={"EGP"}>
                    <EG title="Egypt" width={20} st />
                    <span style={{ marginLeft: "10px" }}>Egypt</span>
                  </MenuItem>
                  <MenuItem value={"CAD"}>
                    <CA title="Canada" width={20} />
                    <span style={{ marginLeft: "10px" }}>Canada</span>
                  </MenuItem>
                  <MenuItem value={"USD"}>
                    <US title="USA" width={20} />
                    <span style={{ marginLeft: "10px" }}>USA</span>
                  </MenuItem>
                  <MenuItem value={"EUR"}>
                    <DE title="EUR" width={20} />
                    <span style={{ marginLeft: "10px" }}>Germany</span>
                  </MenuItem>
                  <MenuItem value={"SAR"}>
                    <SA title="USA" width={20} />
                    <span style={{ marginLeft: "10px" }}>KSA</span>
                  </MenuItem>
                  <MenuItem value={"AED"}>
                    <AE title="USA" width={20} />
                    <span style={{ marginLeft: "10px" }}>UAE</span>
                  </MenuItem>
                  <MenuItem value={"GBP"}>
                    <GB title="USA" width={20} />
                    <span style={{ marginLeft: "10px" }}>UK</span>
                  </MenuItem>
                  <MenuItem value={"CNY"}>
                    <CN title="USA" width={20} />
                    <span style={{ marginLeft: "10px" }}>China</span>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid alignSelf="center" item>
              {/* <Button variant="outlined" className={classes.navButtons}>
                Login
              </Button> */}
              <MyLink href="#" underline="none">
                Login
              </MyLink>
            </Grid>
            <Grid alignSelf="center" item>
              <MyLink color="white" underline="none">
                Sign Up
              </MyLink>
            </Grid>
          </Grid>

          {/* <Button
            onClick={() => history.push("/createcourse")}
            variant="contained"
          >
            Create course
          </Button>
          <Button variant="contained" onClick={() => history.push("/test")}>
            course content
          </Button>
          </Button> */}
        </Toolbar>
      </AppBar>
    </CssBaseline>
  );
}
