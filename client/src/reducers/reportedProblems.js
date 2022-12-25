import { REPORT_PROBLEM, GET_REPORTED_PROBLEMS,START_LOADING,END_LOADING } from "../constants/reportedProblems";

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
        default:
            return state;
    }
};
