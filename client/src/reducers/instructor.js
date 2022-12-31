import {
  FETCH_ALL,
  ADD_INSTRUCTOR,
  FETCH_INSTRUCTOR,
  FETCH_INSTRUCTORS,
  ADD_RATING,
  ADD_REVIEW,
} from "../constants/instructors";

export default (instructors = [], action) => {
  console.log("Iam here in the INSRTUCTOR reducer");
  console.log(instructors);
  switch (action.type) {
    case FETCH_INSTRUCTORS:
      return action.payload;
    case FETCH_INSTRUCTOR:
      return instructors.filter(
        (instructor) => instructor._id === action.payload._id
      );
    case ADD_INSTRUCTOR:
      return [...instructors, action.payload];
    case ADD_RATING:
      console.log("Im in reducer add rating");
      return instructors.filter(
        (instructor) => instructor._id === action.payload._id
      );
    case ADD_REVIEW:
      return instructors.filter(
        (instructor) => instructor._id === action.payload._id
      );
    default:
      return instructors;
  }
};
