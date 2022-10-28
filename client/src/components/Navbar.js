import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { CssBaseline, Grid, TextField } from "@mui/material";
import image from "../images/logo2.jpeg";
import useStyles from "../css/navbar";
import { Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
export default function ButtonAppBar() {
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = anchorEl;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
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
            <TextField
              sx={{ backgroundColor: "white", width: "400px" }}
              placeholder="Search for courses"
            ></TextField>
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
