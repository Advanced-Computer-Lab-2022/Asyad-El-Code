import {
  ADD_INSTRUCTOR,
  FETCH_INSTRUCTORS,
  FETCH_INSTRUCTOR,
} from "../constants/instructors";

export default (instructors = [], action) => {
  switch (action.type) {
    case FETCH_INSTRUCTORS:
      return action.payload;
    case FETCH_INSTRUCTOR:
      return action.payload;
    case ADD_INSTRUCTOR:
      return [...instructors, action.payload];
    default:
      return instructors;
  }
};
