import * as problemApi from "../api/problem";
import { REPORT_PROBLEM, START_LOADING, END_LOADING } from "../constants/reportedProblems";

export const reportProblem = (problem) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        console.log("PROBLEM IS : ", problem);
        const { data } = await problemApi.reportProblem(problem);
        dispatch({ type: REPORT_PROBLEM, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};