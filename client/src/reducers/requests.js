import {
  ACCEPT,
  DELETE_REQUEST,
  REJECT,
  FETCH_REQUESTS,
  ADD_REQUEST,
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
    case ADD_REQUEST:
      return [...requests, action.payload];
    default:
      return requests;
  }
};
