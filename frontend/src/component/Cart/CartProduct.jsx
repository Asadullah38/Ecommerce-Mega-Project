import React, { useState } from 'react'
import "./Cart.css";
const CartProduct = ({ item }) => {
    let [qty, setQty] = useState(item.quantity)

    return (
        <div className="product">
            <div className="product-image">
                <img src={item.image} />
            </div>
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
                <button className="remove-product">
                    Remove
                </button>
            </div>
        </div>

    )
}

export default CartProduct
