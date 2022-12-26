import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import QuizIcon from "@mui/icons-material/Quiz";

import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useState } from "react";
import { useEffect } from "react";
import * as individualTraineeApi from "../../api/individualTrainees.js";
import { CourseContentWelcomePage } from "./CourseContentWelcomePage.js";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function AccordionSet({
  index,
  outline,
  course,
  userObject,
  handleVideoClick,
  handleExerciseClick,
  updateUserObject,
}) {
  const [expanded, setExpanded] = React.useState("panel1");
  const [checked, setChecked] = React.useState(new Map());

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleVidClick = (subtitle) => {
    handleVideoClick(subtitle);
  };
  const handleClickEx = (exercise, exerciseId) => {
    handleExerciseClick(exercise, exerciseId);
  };
  const handleCheck = (e, ind) => {
    e.stopPropagation();
    individualTraineeApi.addSeenContent(
      userObject._id,
      course._id,
      outline.subtitles[ind]._id,
      outline.subtitles[ind].minutes
    );
    setChecked((prev) => new Map(prev).set(`outline${index}index${ind}`, true));
    updateUserObject(
      outline.subtitles[ind].minutes,
      outline.subtitles[ind]._id
    );
  };

  useEffect(() => {
    updateChecked();
  }, [userObject?.courses?.find((c) => c._id === course._id)?.seenContent]);

  const updateChecked = () => {
    const co = userObject?.courses?.find((c) => c._id === course?._id);
    for (let i = 0; i < outline?.subtitles.length; i++) {
      let seen = co?.seenContent?.find(
        (s) => s._id === outline?.subtitles[i]._id
      );
      if (seen) {
        setChecked((prev) =>
          new Map(prev).set(`outline${index}index${i}`, true)
        );
      } else {
        setChecked((prev) =>
          new Map(prev).set(`outline${index}index${i}`, false)
        );
      }
    }
  };
  const getChecked = (ind) => {
    const booleanValue = checked.get(`outline${index}index${ind}`);
    return booleanValue;
  };
  console.log("boolean value is ", checked.get(`outline${index}index0`));
  return (
    <div>
      <Accordion
        expanded={expanded === `panel${index}`}
        onChange={handleChange(`panel${index}`)}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography fontWeight="bold" display="block">
            Section {index + 1}: {outline?.outline}
            <br />
            <Typography fontWeight="normal" color="grey" display="block">
              15/5 | 2 hrs
            </Typography>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {outline?.subtitles.map((sub, ind) => {
            return (
              <Stack ml={-2} direction="row">
                <ListItemButton onClick={() => handleVidClick(sub)}>
                  <Checkbox
                    sx={{ mb: 3 }}
                    onClick={(e) => handleCheck(e, ind)}
                    checked={
                      checked.get(`outline${index}index${ind}`) ? true : false
                    }
                  ></Checkbox>
                  <Typography f display="block">
                    {sub.subtitle}
                    <br />
                    <Typography
                      fontWeight="normal"
                      color="grey"
                      display="block"
                    >
                      <PlayCircleIcon fontSize="10"></PlayCircleIcon>{" "}
                      {sub.minutes} mins
                    </Typography>
                  </Typography>
                </ListItemButton>
              </Stack>
            );
          })}
          <Stack ml={-2} direction="row">
            <ListItemButton
              onClick={() => handleClickEx(outline?.exercises, outline?._id)}
            >
              <Checkbox
                sx={{ mb: 3 }}
                checked={
                  userObject?.courses
                    ?.find((c) => c._id === course?._id)
                    ?.grades?.find((g) => g._id === outline._id)?.score
                    ? true
                    : false
                }
              ></Checkbox>
              <Typography f display="block">
                Quiz
                <br />
                <Typography fontWeight="normal" color="grey" display="block">
                  <QuizIcon fontSize="10"></QuizIcon> 2mins{" "}
                  {
                    userObject?.courses
                      ?.find((c) => c._id === course?._id)
                      ?.grades?.find((g) => g._id === outline._id)?.score
                  }
                  /
                  {
                    userObject?.courses
                      ?.find((c) => c._id === course?._id)
                      ?.grades?.find((g) => g._id === outline._id)?.total
                  }
                </Typography>
              </Typography>
            </ListItemButton>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

// <List>
// <ListItemButton>
//   <ListItem>
//     <Checkbox></Checkbox>
//     <ListItemText>
//       Introduction To Science
//       <br />
//       <span style={{ color: "grey", fontSize: 13 }}>
//         <PlayCircleIcon fontSize="10"></PlayCircleIcon> 2mins{" "}
//       </span>
//     </ListItemText>
//     {/* Add text below it to show total hours of video */}
//   </ListItem>
// </ListItemButton>
// </List>
