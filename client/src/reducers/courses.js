import { FETCH_ALL } from "../constants/courses";

export default (courses = [], action) => {
  console.log("Iam here");
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    default:
      return courses;
  }
};
