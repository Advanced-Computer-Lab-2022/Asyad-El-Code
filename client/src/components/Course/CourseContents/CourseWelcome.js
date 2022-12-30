import {
  Button,
  Container,
  outlinedInputClasses,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./courseWelcomeCard.css";
import LinearProgress from "@mui/material/LinearProgress";
import { CE } from "./Certificate/Certificate";
import CircularProgressWithLabel from "./CircularProgressWithLabel.js";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
export const CourseWelcome = ({
  progress,
  course,
  showCertificate,
  userObject,
  handleVideoClick,
}) => {
  const [page, setPage] = useState(0);
  const [latestContent, setLatestContent] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#000000");
  const [grade, setGrade] = useState(0);
  useEffect(() => {
    if (grade < 50) {
      setColor("#CD7F32");
    } else if (grade < 80) {
      setColor("#C0C0C0");
    } else {
      setColor("#FFD700");
    }
  }, [grade]);
  useEffect(() => {
    if (userObject?.courses?.find((c) => c._id === course._id)?.seenContent) {
      const latest = userObject?.courses
        ?.find((c) => c._id === course._id)
        ?.seenContent?.pop();
      setLatestContent(latest);
      userObject?.courses
        ?.find((c) => c._id === course._id)
        ?.seenContent?.push(latest);
    }
  }, [userObject?.courses?.find((c) => c._id === course._id)?.seenContent]);

  useEffect(() => {
    if (latestContent !== "") {
      course?.outlines?.forEach((outline) => {
        if (outline.subtitles) {
          outline.subtitles.forEach((subtitle) => {
            if (subtitle?._id === latestContent?._id) {
              setContent(subtitle);
            }
          });
        }
      });
    }
  }, [latestContent]);
  useEffect(() => {
    let score = 0;
    let total = 0;
    userObject?.courses
      ?.find((c) => c._id === course._id)
      ?.grades?.forEach((g) => {
        score += g.score;
        total += g.total;
      });
    setGrade((score / total) * 100);
  }, [userObject?.courses?.find((c) => c._id === course._id)?.grades]);
  return (
    <>
      {page === 0 ? (
        <Container style={{ marginTop: 150, marginLeft: 130 }}>
          <div class="course">
            <div class="course-preview">
              <h6>Course</h6>
              <h2>{course.title}</h2>
              <a href="#">
                <i class="fas fa-chevron-right"></i>
              </a>
            </div>
            <div class="course-info">
              <div class="progress-container">
                <LinearProgress
                  variant="determinate"
                  value={parseInt(progress)}
                ></LinearProgress>
                <span class="progress-text">{progress}%</span>
              </div>
              {progress === 100 ? (
                <>
                  <h6>Get Your Certificate now!</h6>
                  <h2>Congratulations!</h2>
                </>
              ) : (
                <>
                  {latestContent !== "" ? (
                    <h6>Continue from where you left</h6>
                  ) : (
                    <h6>Get Started</h6>
                  )}
                  {latestContent !== "" ? (
                    <h2>{content?.subtitle} </h2>
                  ) : (
                    <h2>Start Learning</h2>
                  )}
                </>
              )}
              <div style={{ bottom: "10px", position: "absolute" }}>
                <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
                  Course Grade
                </Typography>
                <CircularProgressWithLabel progress={grade} />
                <EmojiEventsIcon
                  sx={{ fontSize: 40 }}
                  style={{ color: color }}
                />
              </div>
              {progress === 100 ? (
                <button
                  onClick={() => setPage(1)}
                  style={{ backgroundColor: "green" }}
                  className="btn-success"
                >
                  Completed
                </button>
              ) : (
                <button class="btn" onClick={() => handleVideoClick(content)}>
                  Continue
                </button>
              )}
            </div>
          </div>
        </Container>
      ) : (
        <CE course={course}></CE>
      )}
    </>
  );
};
