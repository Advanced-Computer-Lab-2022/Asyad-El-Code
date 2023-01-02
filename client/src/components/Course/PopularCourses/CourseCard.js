import React from "react";
import "./card.css";
import image from "../../../images/point.png";
import { Avatar, Grid, Rating, Stack, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";

export const CardCourse = ({ handleClick, course }) => {
  return (
    <a
      onClick={() => handleClick(course?._id, course?.title)}
      style={{ marginTop: "140px", cursor: "pointer", width: "280px" }}
      class="card"
    >
      <img src={image} class="card__image" alt="" />
      <div class="card__overlay">
        <div class="card__header">
          <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
            <path />
          </svg>

          <Avatar>
            {course?.instructor?.name.charAt(0) +
              "" +
              course?.instructor?.name.charAt(1)}
          </Avatar>

          <div class="card__header-text">
            <h3 class="card__title">{course?.title}</h3>

            <Stack direction="column">
              <Grid container>
                <Grid item xs={8}>
                  <span class="card__status">{course?.instructor?.name}</span>
                </Grid>
                <Grid item xs={4}>
                  <Stack direction="row">
                    <GroupIcon
                      style={{
                        marginTop: 4,
                        marginLeft: 15,
                        fontSize: "16px",
                        color: "#6A515E",
                      }}
                    />

                    <Typography
                      marginLeft={0.2}
                      marginTop={0.2}
                      fontSize="14px"
                      color="#808080"
                    >
                      {course?.numberOfTraineesEnrolled}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Rating
                style={{ marginLeft: -5 }}
                readOnly
                value={course?.rating}
              ></Rating>
            </Stack>
          </div>
        </div>
        <p class="card__description">{course?.summary}</p>
      </div>
    </a>
  );
};
export default CardCourse;
