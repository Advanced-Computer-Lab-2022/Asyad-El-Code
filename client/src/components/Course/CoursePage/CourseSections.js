import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import LecturesLinks from "../CourseContents/LecturesLinks";

export default function CourseSections({ course }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {course?.outlines.map((outline, index) => {
        return (
          <Accordion
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{ backgroundColor: "#EBF1F2" }}
            >
              <Typography sx={{ flex: 2, width: "33%", flexShrink: 0 }}>
                {outline.outline}
              </Typography>

              <Typography sx={{ color: "text.secondary" }}>
                {` ${
                  outline.subtitles.length + outline.exercises.length
                } Lectures  ${outline.totalHours}hr`}
              </Typography>
            </AccordionSummary>
            <LecturesLinks subtitles={outline.subtitles}></LecturesLinks>
            <AccordionDetails></AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
