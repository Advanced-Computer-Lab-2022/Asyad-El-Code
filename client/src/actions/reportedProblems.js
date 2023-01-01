import * as problemApi from "../api/problem";
import {
  REPORT_PROBLEM,
  START_LOADING_PROBLEMS,
  END_LOADING_PROBLEMS,
  GET_REPORTED_PROBLEMS,
  UPDATE_REPORTED_PROBLEM,
} from "../constants/reportedProblems";

export const reportProblem = (problem) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_PROBLEMS });
    const { data } = await problemApi.reportProblem(problem);
    dispatch({ type: REPORT_PROBLEM, payload: data });
    dispatch({ type: END_LOADING_PROBLEMS });
  } catch (error) {
    console.log(error);
  }
};

export const getAllProblems = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_PROBLEMS });
    const { data } = await problemApi.getAllProblems();
    dispatch({ type: GET_REPORTED_PROBLEMS, payload: data });
    dispatch({ type: END_LOADING_PROBLEMS });
  } catch (error) {
    console.log(error);
  }
};

export const updateProblem = (id, problem) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_PROBLEMS });
    const { data } = await problemApi.updateProblem(id, problem);
    dispatch({ type: UPDATE_REPORTED_PROBLEM, payload: data });
    dispatch({ type: END_LOADING_PROBLEMS });
  } catch (error) {
    console.log(error);
  }
};
