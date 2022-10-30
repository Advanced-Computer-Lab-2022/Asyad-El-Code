import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CourseOutline from "./CourseOutline";
import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { useDispatch } from "react-redux";
import { createCourse } from "../../actions/courses";
const drawerWidth = 240;

const useStyles = makeStyles()((theme) => {
  return {
    formStyle: {
      margin: "50px",
      backgroundColor: "aqua",
    },
    textArea: {
      color: "gold",
      minHeight: "100px",
    },
    boxStyle: {
      border: "1px",
      borderRadius: "30px",
      borderColor: "red",
      width: "50%",
      margin: "10px",
    },
  };
});

const initialFormState = {
  title: "",
  summary: "",
  subject: "",
  duration: "",
  releaseDate: "",
  language: "",
  image: "",
  rating: "",
  previewVideo: "",
  outlines: [],
  exercises: [],
  price: "",
  instructor: {
    instructorId: "635c587e07f18b986c357bb7",
    name: "klllllll",
  },
  discount: [{ country: "", precentage: "" }],
};

function CourseStructure(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [initialForm, setInitialForm] = React.useState(initialFormState);
  const { window } = props;
  const [page, setPage] = useState("Course Details");
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClick = (text) => {
    setPage(text);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    const key = e.target.name;
    setInitialForm({ ...initialForm, [key]: val });
  };

  const submitOutlines = (state) => {
    setInitialForm({ ...initialForm, outlines: state });
  };
  const handleSubmit = () => {
    dispatch(createCourse(initialForm));
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["Course Details", "Course Content", "Course Preview"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleClick(text)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {/* Rendering Components HERE according to the chosen side */}
        <div>
          {page === "Course Details" ? (
            <Box>
              <form onSubmit={handleSubmit}>
                <Grid
                  container
                  spacing={5}
                  maxWidth="40%"
                  margin="20px"
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom textAlign="center">
                      Page 1/3
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="title"
                      name="title"
                      label="Course Title"
                      fullWidth
                      variant="outlined"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl required fullWidth>
                      <InputLabel id="category-select-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="category-select-label"
                        id="category-select"
                        name="category"
                        label="Category"
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Computer Science</MenuItem>
                        <MenuItem value={20}>Commerce</MenuItem>
                        <MenuItem value={30}>Finance</MenuItem>
                        <MenuItem value={30}>Robotics</MenuItem>
                        <MenuItem value={30}>Project Management</MenuItem>
                        <MenuItem value={30}>Logistics</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="price"
                      name="cost"
                      label="Cost"
                      fullWidth
                      variant="outlined"
                      type="number"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="duration"
                      name="duration"
                      label="Duration"
                      fullWidth
                      variant="outlined"
                      type="number"
                      onChange={handleChange}
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={4}>
                  <TextField
                      required
                      id="weeks"
                      name="weeks"
                      label="Weeks"
                      fullWidth
                      variant="outlined"
                      type="number"
                      value={state.weeks}
                      onChange={handleChange}
                  />
              </Grid> */}

                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="description"
                      name="description"
                      label="Description"
                      fullWidth
                      variant="outlined"
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="imageURL"
                      name="imageURL"
                      label="Image URL"
                      fullWidth
                      variant="outlined"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={9}></Grid>
                  <Grid
                    item
                    xs={2}
                    alignItems="end"
                    justifyContent="flex-end"
                    alignContent="flex-end"
                  >
                    <Button variant="contained" onClick={handleSubmit}>
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          ) : page === "Course Content" ? (
            <CourseOutline submitOutlines={submitOutlines}></CourseOutline>
          ) : page === "Course Preview" ? (
            <div>COURSE PREVIEW</div>
          ) : null}
        </div>
      </Box>
    </Box>
  );
}

CourseStructure.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default CourseStructure;
