import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, CLEAR_ERRORS, USER_LOAD_FAIL, USER_LOAD_REQUEST, USER_LOAD_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTRATION_SUCCESS, REGISTRATION_REQUEST, REGISTRATION_FAIL, PROFILE_UPDATE_FAIL, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_REQUEST, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_FAIL, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST } from "../constants/userConstants";
import axios from "axios";

//REGISTRATION OF NEW USER
export const registerUser = (name, email, password, avatar) => async (dispatch) => {
    try {
        dispatch({ type: REGISTRATION_REQUEST })

        const config = { Headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/createuser`, { name, email, password, avatar }, config);
        dispatch({
            type: REGISTRATION_SUCCESS,
            payload: data.newUser
        })
    } catch (error) {
        dispatch({
            type: REGISTRATION_FAIL,
            payload: error.response.data.message
        })
    }
}



//LOGIN FUNCTION
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const config = { Headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/loginUser`, { email, password }, config);
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

//CHECK BY LOADING USER
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LOAD_REQUEST })

        const { data } = await axios.get(`/me`);
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

//LOGOUT FUNCTION
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/logout`);
        dispatch({ type: LOGOUT_SUCCESS })
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

//UPDATE NAME AND AVATAR
export const updateProfile = (name, avatar) => async (dispatch) => {
    try {

        dispatch({ type: PROFILE_UPDATE_REQUEST })
        const config = { Headers: { "Content-Type": "application/json" } }


        const { data } = await axios.put(`/me/updateProfile`, { name, avatar }, config);


        dispatch({
            type: PROFILE_UPDATE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: PROFILE_UPDATE_FAIL,
            payload: error.response.data.message
        })
    }
}

//UPDATE PASSWORD WHILE LOGGED IN
export const updateYourPassword = (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST })
        const config = { Headers: { "Content-Type": "application/json" } }

        const { data } = await axios.put(`/password/update`, { oldPassword, newPassword, confirmPassword }, config);
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })

    }
}






//FORGOT_PASSWORD REQUESTING EMAIL
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const config = { Headers: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/password/forgot`, { email }, config);
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

export const resetPassword = (password, confirmPassword, token) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST })

        const config = { Headers: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/password/reset/${token}`, { password, confirmPassword }, config);
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}




//CLEAR_ERRORS
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS, })
}





