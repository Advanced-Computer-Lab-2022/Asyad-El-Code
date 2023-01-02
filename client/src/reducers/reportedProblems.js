import {
  REPORT_PROBLEM,
  GET_REPORTED_PROBLEMS,
  START_LOADING_PROBLEMS,
  END_LOADING_PROBLEMS,
  UPDATE_REPORTED_PROBLEM,
} from "../constants/reportedProblems";

export default (state = { isLoading: true, problems: [] }, action) => {
  switch (action.type) {
    case START_LOADING_PROBLEMS:
      return { ...state, isLoading: true };
    case END_LOADING_PROBLEMS:
      return { ...state, isLoading: false };

    case REPORT_PROBLEM:

    case GET_REPORTED_PROBLEMS:
      return { ...state, problems: action.payload };
    case UPDATE_REPORTED_PROBLEM:
    console.log("IN REDUCER TO UPDATE PROBLEM", action.payload);
      const index = state.problems.findIndex(
        (problem) => problem._id === action.payload._id
      );
      state.problems[index] = action.payload;
      return { ...state, problems: state.problems };
    default:
      return state;
  }
};
