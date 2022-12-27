import { Button, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./courseWelcomeCard.css";
import LinearProgress from "@mui/material/LinearProgress";
import { CE } from "./Certificate/Certificate";
export const CourseWelcome = ({ progress, course }) => {
  const [page, setPage] = useState(0);
  return (
    <>
      {page === 0 ? (
        <Container style={{ marginTop: 150, marginLeft: 130 }}>
          <div class="course">
            <div class="course-preview">
              <h6>Course</h6>
              <h2>{course.title}</h2>
              <a href="#">
                View all chapters <i class="fas fa-chevron-right"></i>
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
                  <h6>Chapter 4</h6>
                  <h2>Callbacks & Closures</h2>
                </>
              )}

              {progress === 100 ? (
                <button
                  onClick={() => setPage(1)}
                  style={{ backgroundColor: "green" }}
                  className="btn-success"
                >
                  Completed
                </button>
              ) : (
                <button class="btn">Continue</button>
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
