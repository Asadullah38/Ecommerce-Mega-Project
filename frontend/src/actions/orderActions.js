import { CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS, CREATE_ORDER_REQUEST, CLEAR_ERRORS } from "../constants/orderConstants";
import axios from "axios";

export const OrderItems = (shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const config = { Headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/order/create`, { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice }, config);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}