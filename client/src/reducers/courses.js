import { FETCH_ALL } from "../constants/courses";

export default (courses = [], action) => {
  console.log("Iam here");
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "FILTER_SUBJECT_RATING":
      return action.payload;
    case "FETCH_ALL_INSTRUCTOR_COURSES":
      return action.payload;
    case "FILTER_INSTRUCTOR_COURSES":
      return action.payload;
    default:
      return courses;
  }
};
