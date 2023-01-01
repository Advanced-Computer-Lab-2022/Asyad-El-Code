import {
  Tab,
  Fab,
  Tabs,
  Box,
  AppBar,
  Grid,
  Container,
  Typography,
  Stack,
  Paper,
  Modal,
  FormControl,
  form,
  OutlinedInput,
  Input,
  InputLabel,
  FormGroup,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import InstructorModal from "./InstructorModal";
import AdminModal from "./AdminModal";
import CorperateModal from "./CorperateModal";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material";
import { getAdmins } from "../../actions/admin";
import InstructorTabPanel from "./InstructorTabPanel";
import { getCorporates } from "../../actions/corporate";
import { getInstructors } from "../../actions/instructor";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Admin = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [adminModal, setAdminModal] = useState(false);
  const [instructorModal, setInstructorModal] = useState(false);
  const [corperateModal, setCorperateModal] = useState(false);
  const dispatch = useDispatch();
  const admins = useSelector((a) => a.admins);
  const corporates = useSelector((c) => c.corporates);

  useEffect(() => {
    dispatch(getAdmins());
    dispatch(getCorporates());
  }, []);
  useEffect(() => {
    dispatch(getAdmins());
  }, [instructorModal]);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const handleAdminModalOpen = () => {
    setAdminModal(true);
  };

  const handleAdminModalClose = () => {
    setAdminModal(false);
  };
  const handleInstructorModalOpen = () => {
    setInstructorModal(true);
  };

  const handleInstructorModalClose = () => {
    setInstructorModal(false);
  };
  const handleCorperateModalOpen = () => {
    setCorperateModal(true);
  };

  const handleCorperateModalClose = () => {
    setCorperateModal(false);
  };

  return (
    <Box bgcolor={"#FAF9F6"}>
      <Container
        sx={{
          backgroundColor: "#FAF9F6",
          marginTop: "30px",
          width: "100%",
        }}
      >
        <Grid>
          <Grid item xs={4} sx={{ fontWeight: "bold", textAlign: "center" }}>
            <h1>Admin Dashboard</h1>
          </Grid>
          <Grid item xs={9} sx={{ backgroundColor: "#ffca3a" }}>
            <Box sx={{ backgroundColor: "lavender", width: "100%" }}>
              <AppBar position="static">
                <Tabs
                  value={tabIndex}
                  onChange={handleTabChange}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="fullWidth"
                  sx={{ backgroundColor: "#081c15" }}
                >
                  <Tab label="Admins" />
                  <Tab label="Instructors" />
                  <Tab label="Corperate" />
                </Tabs>
              </AppBar>
              <TabPanel value={tabIndex} index={0}>
                <Grid container bgcolor={"lavender"}>
                  {admins.map((admin, index) => {
                    return (
                      <Grid
                        container
                        key={index}
                        sx={{ backgroundColor: "lavender", padding: "15px" }}
                      >
                        <Grid item xs={1}>
                          <AccountCircleIcon />
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            {admin?.userName}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography sx={{ fontWeight: "bold" }}>
                            {admin?.email}
                          </Typography>
                        </Grid>
                        <Divider></Divider>
                      </Grid>
                    );
                  })}
                  <Grid item xs={10}></Grid>
                  <Grid item xs={2} mt={4}>
                    <Fab
                      color="secondary"
                      aria-label="add"
                      onClick={handleAdminModalOpen}
                    >
                      <PersonAddIcon />
                    </Fab>
                  </Grid>
                </Grid>
              </TabPanel>
              <InstructorTabPanel
                value={tabIndex}
                index={1}
                modalOpen={handleInstructorModalOpen}
                modalClose={handleInstructorModalClose}
              ></InstructorTabPanel>
              <TabPanel value={tabIndex} index={2}>
                <Grid container>
                  {corporates.map((corporate, index) => {
                    return (
                      <Grid
                        container
                        key={index}
                        sx={{ backgroundColor: "lavender", padding: "15px" }}
                      >
                        <Grid item xs={1}>
                          <AccountCircleIcon />
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            {corporate?.userName}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography sx={{ fontWeight: "bold" }}>
                            {corporate?.email}
                          </Typography>
                        </Grid>
                        <Divider></Divider>
                      </Grid>
                    );
                  })}
                  <Grid item xs={10}></Grid>
                  <Grid item xs={2} mt={4}>
                    <Fab
                      color="secondary"
                      aria-label="add"
                      onClick={handleCorperateModalOpen}
                    >
                      <PersonAddIcon />
                    </Fab>
                  </Grid>
                </Grid>
              </TabPanel>
            </Box>
          </Grid>
          <AdminModal open={adminModal} handleClose={handleAdminModalClose} />
          <InstructorModal
            open={instructorModal}
            handleClose={handleInstructorModalClose}
          />
          <CorperateModal
            open={corperateModal}
            handleClose={handleCorperateModalClose}
          />
        </Grid>
      </Container>
    </Box>
  );
};

export default Admin;
