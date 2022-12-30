import {
  REPORT_PROBLEM,
  GET_REPORTED_PROBLEMS,
  START_LOADING,
  END_LOADING,
  UPDATE_REPORTED_PROBLEM,
} from "../constants/reportedProblems";

export default (state = { isLoading: true, problems: [] }, action) => {
  console.log("Iam here in the reported problems reducer");
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case REPORT_PROBLEM:

    case GET_REPORTED_PROBLEMS:
      return { ...state, problems: action.payload };
    case UPDATE_REPORTED_PROBLEM:
      const index = state.problems.findIndex(
        (problem) => problem._id === action.payload._id
      );
      state.problems[index] = action.payload;
      return { ...state, problems: state.problems };
    default:
      return state;
  }
};
