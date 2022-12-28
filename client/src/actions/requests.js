import * as api from "../api/admin";
import { FETCH_ALL, DELETE_REQUEST, ACCEPT, REJECT } from "../constants/requests";


export const getCourseRequests = () => async (dispatch) => {
    try {
        const { data } = await api.getAllCourseRequests();
        console.log(data);
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const acceptCourseRequest = (request) => async (dispatch) => {
    try {
        const res = await api.acceptCourseRequest(request);
        console.log(res.data);
        if (res.status === 200)
            dispatch({ type: ACCEPT, payload: res.data });
    } catch (error) {
        console.log(error);
    }
};

export const rejectCourseRequest = (request) => async (dispatch) => {
    try {
        const res = await api.rejectCourseRequest(request);
        console.log(res.data);
        if (res.status === 200)
            dispatch({ type: REJECT, payload: res.data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteCourseRequest = (id) => async (dispatch) => {
    try {
        await api.deleteCourseRequest(id);
        dispatch({ type: DELETE_REQUEST, payload: id });
    } catch (error) {
        console.log(error);
    }
};
