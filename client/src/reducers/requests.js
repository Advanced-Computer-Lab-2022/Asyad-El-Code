import {
  ACCEPT,
  DELETE_REQUEST,
  REJECT,
  FETCH_REQUESTS,
} from "../constants/requests";

export default (requests = [], action) => {
  switch (action.type) {
    case FETCH_REQUESTS:
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
