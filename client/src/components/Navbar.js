import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { CssBaseline, Grid, TextField, InputLabel, Select, FormControl } from "@mui/material";
import useStyles from "../css/navbar";
import { Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { US, EG, CA } from 'country-flag-icons/react/3x2'
export default function ButtonAppBar() {
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [country, setCountry] = React.useState("");

  const open = anchorEl;

  const handleClick = (event) => {
    console.log("asdsdsa")
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleCountry = (event) => {
    setCountry(event.target.value);
    console.log(country)
  };

  // React.useEffect(())

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
            <TextField
              sx={{ backgroundColor: "white", width: "400px" }}
              placeholder="Search for courses"
            ></TextField>
          </div>

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
                  <MenuItem value={"Egypt"}><EG title="Egypt" width={20} />Egypt</MenuItem>
                  <MenuItem value={"Canada"}><CA title="Canada" width={20} />Canada</MenuItem>
                  <MenuItem value={"USA"}><US title="United States" width={20} />USA</MenuItem>
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
        </Toolbar>
      </AppBar>
    </CssBaseline>
  );
}
