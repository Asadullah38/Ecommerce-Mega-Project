import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, CLEAR_ERRORS, USER_LOAD_FAIL, USER_LOAD_REQUEST, USER_LOAD_SUCCESS } from "../constants/userConstants";


export const userReducer = ((state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case USER_LOAD_REQUEST:
            return {
                loading: true,
                user: null,
                isAuthenticated: false
            }

        case LOGIN_SUCCESS:
        case USER_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case USER_LOAD_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
})

