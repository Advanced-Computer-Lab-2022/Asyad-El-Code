import { FETCH_ALL, ACCEPT, DELETE_REQUEST, REJECT } from "../constants/requests";

export default (requests = [], action) => {
  console.log("Course Requests reducer");
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case ACCEPT:
        return requests;
    case REJECT:
        return requests;
    case DELETE_REQUEST:
        return requests.filter((request) => request._id !== action.payload);
    default:
      return requests;
  }
};
