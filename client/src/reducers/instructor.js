import {
  ADD_INSTRUCTOR,
  FETCH_INSTRUCTORS,
  FETCH_INSTRUCTOR,
  ADD_INSTRUCTOR_RATING,
  ADD_INSTRUCTOR_REVIEW,
} from "../constants/instructors";

export default (instructors = [], action) => {
  switch (action.type) {
    case FETCH_INSTRUCTORS:
      return action.payload;
    case FETCH_INSTRUCTOR:
      return [action.payload];
    case ADD_INSTRUCTOR:
      return [...instructors, action.payload];

    case ADD_INSTRUCTOR_RATING:
      return instructors.filter((instructor) =>
        instructor._id === action.payload._id ? action.payload : instructor
      );
    case ADD_INSTRUCTOR_REVIEW:
      return instructors.filter((instructor) =>
        instructor._id === action.payload._id ? action.payload : instructor
      );

    default:
      return instructors;
  }
};
