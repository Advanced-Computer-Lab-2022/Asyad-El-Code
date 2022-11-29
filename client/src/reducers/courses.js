import {
  CREATE_COURSE,
  FETCH_ALL,
  GET_COURSE_DATA,
  FILTER_COURSES,
  GET_COURSE,
} from "../constants/courses";

export default (courses = [], action) => {
  console.log("Iam here");
  switch (action.type) {
    case FILTER_COURSES:
      return action.payload;
    case "FETCH_ALL":
      return action.payload;
    case "FILTER_SUBJECT_RATING":
      return action.payload;
    case "FETCH_ALL_INSTRUCTOR_COURSES":
      return action.payload;
    case "FILTER_INSTRUCTOR_COURSES":
      return action.payload;
    case CREATE_COURSE:
      return [...courses, action.payload];
    case GET_COURSE_DATA:
      return courses.filter((course) => course._id === action.payload._id);
    case GET_COURSE:
      return courses.filter((course) => course._id === action.payload._id);
    default:
      return courses;
  }
};
