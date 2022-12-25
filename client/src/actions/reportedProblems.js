import * as problemApi from "../api/problem";
import { REPORT_PROBLEM, START_LOADING, END_LOADING, GET_REPORTED_PROBLEMS , UPDATE_REPORTED_PROBLEM} from "../constants/reportedProblems";

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

export const getAllProblems = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await problemApi.getAllProblems();
        console.log("ALL PROBLEMS : ", data);
        dispatch({ type: GET_REPORTED_PROBLEMS, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const updateProblem = (id, problem) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await problemApi.updateProblem(id, problem);
        dispatch({ type: UPDATE_REPORTED_PROBLEM, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};
