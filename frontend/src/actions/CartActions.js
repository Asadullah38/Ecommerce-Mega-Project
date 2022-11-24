import { ADD_TO_CART, REMOVE_ITEM_FROM_CART } from "../constants/cartConstants";
import axios from "axios";



//UPDATE NAME AND AVATAR
export const AddToCart = (id, quantity) => async (dispatch, getState) => {


    const config = { Headers: { "Content-Type": "application/json" } }
    const { data } = await axios.get(`/product/${id}`, config);
    dispatch({
        type: ADD_TO_CART, payload: {
            product: data.findProduct._id,
            name: data.findProduct.name,
            price: data.findProduct.price,
            image: data.findProduct.images[0].url,
            stock: data.findProduct.Stock,
            quantity
        }
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}


export const removeItemFromCart = (id) => async (dispatch, getState) => {


    const config = { Headers: { "Content-Type": "application/json" } }
    dispatch({
        type: REMOVE_ITEM_FROM_CART, payload:id,
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}
