import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCourses } from "../../actions/courses";
import { Typography } from "@mui/material";
import { CoursesGrid } from "./CoursesGrid";

export const Courses = () => {
  const dispatch = useDispatch();
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const handleClick = (e, course) => {
    e.preventDefault();
    console.log(course);
    if (courseList.find((c) => c.id === course.id)) {
      setCourseList(courseList.filter((c) => c.id !== course.id));
    } else {
      setCourseList([...courseList, course]);
    }

  };
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        All Courses
      </Typography>
      <CoursesGrid handleClick={handleClick} List={courseList}></CoursesGrid>
    </div>
  );
};
