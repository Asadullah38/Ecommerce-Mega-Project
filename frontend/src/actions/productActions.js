import axios from "axios";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants";


export const getProduct = (currentpage=1,min=0,max=25000,ratings=0,cateogry) => async (dispatch) => {
    
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST, })
        const { data } = await axios.get(`/getProducts?page=${currentpage}&price[gte]=${min}&price[lte]=${max}&ratings[gte]=${ratings}`);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST, })
        const data = await axios.get(`/product/${id}`);
        console.log(data);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.data.findProduct
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}




//CLEAR_ERRORS
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS, })
}


