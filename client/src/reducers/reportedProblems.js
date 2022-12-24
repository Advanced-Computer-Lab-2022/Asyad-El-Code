import { REPORT_PROBLEM } from "../constants/reportedProblems";

export default (state = { isLoading: true, problems: {} }, action) => {
    console.log("Iam here in the reported problems reducer");
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };

        case REPORT_PROBLEM:
            
        default:
            return state;
    }
};
