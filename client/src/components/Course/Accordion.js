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
}) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleVidClick = (subtitle) => {
    handleVideoClick(subtitle);
  };
  const handleClickEx = (exercise, exerciseId) => {
    handleExerciseClick(exercise, exerciseId);
  };

  console.log("this is outline", outline);
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
              15/5 | 2hrs
            </Typography>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {outline?.subtitles.map((sub) => {
            return (
              <Stack ml={-2} direction="row">
                <ListItemButton onClick={() => handleVidClick(sub)}>
                  <Checkbox sx={{ mb: 3 }}></Checkbox>
                  <Typography f display="block">
                    {sub.subtitle}
                    <br />
                    <Typography
                      fontWeight="normal"
                      color="grey"
                      display="block"
                    >
                      <PlayCircleIcon fontSize="10"></PlayCircleIcon> 2mins{" "}
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
              <Checkbox sx={{ mb: 3 }}></Checkbox>
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
