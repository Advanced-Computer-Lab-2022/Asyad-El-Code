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
import {Courses} from './Courses';
import { styled } from "@mui/material/styles";


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
    content = <ReportedProblems />;
  } else if (currentPage === "coursesPromo") {
    content = <Courses />;
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>

          <ListItem key="Dashboard" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon style={{color: 'white'}}/>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem key="Course Requests" disablePadding onClick={() => setCurrentPage("courseRequest")}>
            <ListItemButton>
              <ListItemIcon>
                <RuleFolderIcon style={{color: 'white'}}/>
              </ListItemIcon>
              <ListItemText primary="Course Requests" />
            </ListItemButton>
          </ListItem>

          <ListItem key="Reported Problems" disablePadding onClick={() => setCurrentPage("reportedProblems")}>
            <ListItemButton>
              <ListItemIcon>
                <ReportProblemIcon style={{color: 'white'}}/>
              </ListItemIcon>
              <ListItemText primary="Reported Problems" />
            </ListItemButton>
          </ListItem>

          <ListItem key="Promotions" disablePadding onClick={() => setCurrentPage("coursesPromo")}>
            <ListItemButton>
              <ListItemIcon>
                <DiscountIcon style={{color: 'white'}}/>
              </ListItemIcon>
              <ListItemText primary="Promotions"/>
              
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

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}

          PaperProps={{
            sx: {
              backgroundColor: "pink",
              color: "red",
            }
          }}
        >
          {drawer}
        </Drawer> */}
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
              backgroundColor: "#1C1D1F",
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