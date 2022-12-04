import { FETCH_ALL,ADD_INSTRUCTOR,FETCH_INSTRUCTORS } from "../constants/instructors";

export default (instructors = [], action) => {
  console.log("Iam here in the INSRTUCTOR reducer");
  console.log(instructors);
  switch (action.type) {
    case FETCH_INSTRUCTORS:
      return action.payload;
    case "FETCH_INSTRUCTOR":
      return action.payload;
    case ADD_INSTRUCTOR:
      return [...instructors,action.payload];
    default:
      return instructors;
  }
};
