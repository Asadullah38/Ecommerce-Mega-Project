import { CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS, CREATE_ORDER_REQUEST, CLEAR_ERRORS, GET_MY_ORDERS_FAIL, GET_MY_ORDERS_REQUEST, GET_MY_ORDERS_SUCCESS } from "../constants/orderConstants";

export const orderReducer = ((state = { order: [] }, action) => {
    switch (action.type) {

        case CREATE_ORDER_REQUEST:
            return {
                loading: true,
                order: []
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
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


export const myOrdersReducer = ((state = { myOrders: [] }, action) => {
    switch (action.type) {

        case GET_MY_ORDERS_REQUEST:
            return {
                loading: true,
                myOrders: []
            }
        case GET_MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case GET_MY_ORDERS_SUCCESS:
            return {
                loading: false,
                myOrders: action.payload
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


