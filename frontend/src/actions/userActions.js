import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, CLEAR_ERRORS, USER_LOAD_FAIL, USER_LOAD_REQUEST, USER_LOAD_SUCCESS } from "../constants/userConstants";
import axios from "axios";


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const config = { Headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/loginUser`, { email, password }, config);
        console.log(data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}


export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LOAD_REQUEST })

        const { data } = await axios.get(`/me`);
        console.log(data);
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data.loggedInUser
        })
    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.message
        })
    }
}








//CLEAR_ERRORS
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS, })
}





