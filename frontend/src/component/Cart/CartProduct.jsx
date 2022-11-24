import React, { useState } from 'react'
import { ReactNotifications } from 'react-notifications-component';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItemFromCart } from '../../actions/CartActions';
import Notification from '../Notification/Notification';
import "./Cart.css";
const CartProduct = ({ item }) => {
    let [qty, setQty] = useState(item.quantity)

    const dispatch = useDispatch();
    const removeFromCart = () => {
        dispatch(removeItemFromCart(item.product));
        Notification("Success", "Item Removed from Cart", "success");
    }
    return (
        <div className="product">
            <ReactNotifications />

            <Link to={`/product/${item.product}`} style={{ "color": "black" }}>
                <div className="product-image">
                    <img src={item.image} />
                </div>
            </Link>
            <div className="product-details">
                <div className="product-title">{item.name}</div>
            </div>
            <div className="product-price">{item.price}</div>
            <div className="product-quantity">
                <button className="qtychange" disabled={(qty === 1) ? true : false} id="minus" onClick={() => setQty(qty - 1)}>-</button>
                <input style={{ width: "20px", margin: "5px" }} type="text" name="" id="" disabled value={qty} />
                <button className="qtychange" disabled={(qty === 5) ? true : false} id="plus" onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <div className="product-removal">
                <button className="remove-product" onClick={removeFromCart}>
                    Remove
                </button>
            </div>
        </div>

    )
}

export default CartProduct
