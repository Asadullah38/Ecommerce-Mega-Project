import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AddToCart, removeItemFromCart } from '../../actions/CartActions';
import "./Cart.css";
const CartProduct = ({ item }) => {
    let [qty, setQty] = useState(item.quantity)

    const dispatch = useDispatch();
    const removeFromCart = () => {
        dispatch(removeItemFromCart(item.product));
    }

    useEffect(() => {
        dispatch(AddToCart(item.product, qty));
    }, [qty, dispatch, item]);

    return (
        <div className="product">

            <Link to={`/product/${item.product}`} style={{ "color": "black" }}>
                <div className="product-image">
                    <img src={item.image} alt={item.name}/>
                </div>
            </Link>
            <div className="product-details">
                <div className="product-title">{item.name}</div>
            </div>
            <div className="product-price">{item.price * qty}</div>
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
