import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RuleFolderIcon from "@mui/icons-material/RuleFolder";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import DiscountIcon from '@mui/icons-material/Discount';
import CourseRequests from './CourseRequest';
import ReportedProblems from './ReportedProblems';
import { Courses } from './Courses';
import { styled } from "@mui/material/styles";
import Problems from './Problems';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Admin from './Admin';
import { Button } from 'reactstrap';


const drawerWidth = 240;

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  paper: {
    background: "blue"
  }
};

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();
  const [user, setUser] = useState(parseJson());
  const [currentPage, setCurrentPage] = useState("courseRequest");

  function parseJson() {
    try {
      return JSON.parse(localStorage.getItem("profile"));
    } catch (ex) {
      return "";
    }
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    history.push("dashboard?source=" + currentPage);
  }, [currentPage]);

  let content = null;
  if (currentPage === "courseRequest") {
    content = <CourseRequests />;
  } else if (currentPage === "reportedProblems") {
    content = <Problems />;
  } else if (currentPage === "coursesPromo") {
    content = <Courses />;
  } else if (currentPage === "adminPage") {
    content = <Admin />;
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>

        <ListItem key="Dashboard" disablePadding style={{ backgroundColor: currentPage === "dashboard" ? "#126E82" : "#132C33" }}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Course Requests" disablePadding onClick={() => setCurrentPage("courseRequest")} style={{ backgroundColor: currentPage === "courseRequest" ? "#126E82" : "#132C33" }}>
          <ListItemButton>
            <ListItemIcon>
              <RuleFolderIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Course Requests" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Reported Problems" disablePadding onClick={() => setCurrentPage("reportedProblems")} style={{ backgroundColor: currentPage === "reportedProblems" ? "#126E82" : "#132C33" }}>
          <ListItemButton>
            <ListItemIcon>
              <ReportProblemIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Reported Problems" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Promotions" disablePadding onClick={() => setCurrentPage("coursesPromo")} style={{ backgroundColor: currentPage === "coursesPromo" ? "#126E82" : "#132C33" }}>
          <ListItemButton>
            <ListItemIcon>
              <DiscountIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Promotions" />
          </ListItemButton>
        </ListItem>

        <ListItem key="User Creation" disablePadding onClick={() => setCurrentPage("adminPage")} style={{ backgroundColor: currentPage === "adminPage" ? "#126E82" : "#132C33" }}>
          <ListItemButton>
            <ListItemIcon>
              <GroupAddIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="User Creation" />
          </ListItemButton>
        </ListItem>

      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>




    </div>
  );


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            backgroundColor: "blue"
          }}
          open
          PaperProps={{
            sx: {
              backgroundColor: "#132C33",
              color: "white",
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;