import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
//import CircleIcon from "@mui/icons-material/CircleIcon";
import CheckIcon from "@mui/icons-material/Check";
import {
  Button,
  Grid,
  Typography,
  // Box,
} from "@mui/material";

export default function CoursePopup({ courseData }) {
  //const classes = useStyles();

  const subtitleItems = [
    {
      text: "first section is all about introduction to python. This section is 1 hour.30 minutes",
      icon: <CheckIcon />,
    },

    {
      text: "second section is fffffff. This section is 1 hour.30 minutes",
      icon: <CheckIcon />,
    },
  ];

  return (
    <div>
      <Paper
        style={{ padding: "20px", width: "400px", height: "440px" }}
        elevation={3}
      >
        <Typography
          sx={{
            marginBottom: "15px",
            fontWeight: "400px",
            fontWeight: "bold",
            lineHeight: "20px",
          }}
          variant="h6"
        >
          {courseData.title}
        </Typography>
        <Grid justifyContent="left" container spacing={1}>
          {/* <Grid item xs={3}>
            <Chip size="small" label="Chip Filled" />
          </Grid> */}

          <Grid item xs={5}>
            <Typography
              style={{ color: "#00adb5" }}
              sx={{
                fontWeight: "20px",
                lineHeight: "normal",
                fontSize: "small",
              }}
              variant="h6"
            >
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(courseData.releaseDate)))}{" "}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <CalendarMonthIcon fontSize="15px" />
          </Grid>

          <Grid item xs={5}></Grid>

          <Grid item xs={4}>
            <Typography
              style={{ color: "#00adb5" }}
              sx={{
                fontWeight: "200px",
                lineHeight: "normal",
                fontSize: "small",
              }}
              variant="h6"
            >
              Total Hours: {courseData.duration}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <AccessTimeIcon fontSize="10px" />
          </Grid>

          <Grid item>
            <Typography sx={{ fontWeight: "bold", fontSize: "small" }}>
              Python for beginners is a course all about shhshhs and will give
              you the chance to learn all about python.
            </Typography>
          </Grid>

          <Grid item>
            <List>
              {/* <ListItem>
                <ListItemText primary="the first section is all about introduction to python" />
              </ListItem>
              <ListItem>
                <ListItemText primary="second section talks about the " />
              </ListItem>
              <ListItem>
                <ListItemText primary="the third section is where we dig deeper into python programming language" />
              </ListItem> */}
              {subtitleItems.map((item) => (
                <ListItem key={item.text}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "small",
                      fontWeight: "bold",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item spacing={1} container direction="row">
            <Grid item xs={10}>
              <Button
                sx={{ width: "300px", padding: "10px", height: "40px" }}
                variant="contained"
                size="large"
              >
                Add to cart{" "}
              </Button>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
