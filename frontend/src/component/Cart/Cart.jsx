import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./Cart.css";
import CartProduct from './CartProduct';
import EmptyCart from './EmptyCart';

const Cart = () => {
    const Navigate = useNavigate();
    const cartItems = useSelector(state => state.cart.cartItems);
    let [total, setTotal] = useState(0.00)
    const { order,loading } = useSelector(state => state.order);
    useEffect(() => {
        if (!loading && order.order) {
            Notification("Success", "Successlly Placed Your Order.", "success");
        }


        let subTotal = 0.00;
        cartItems.map((i) => {
            subTotal += (i.price * i.quantity);
        })
        setTotal(subTotal);
    }, [total, cartItems])

    return (
        <div>
            <div className="card-header">
                <h1>Cart</h1>
            </div>
            {cartItems.length ?
                <div className="shopping-cart">
                    <div className="column-labels">
                        <label className="product-image">Image</label>
                        <label className="product-details">Product</label>
                        <label className="product-price">Price</label>
                        <label className="product-quantity">Qty</label>
                        <label className="product-removal">X</label>
                    </div>
                    {cartItems.map((item, key) => {
                        return <CartProduct key={key} item={item} />

                    })}

                    <div className="totals">
                        <div className="totals-item">
                            <label>Subtotal</label>
                            <div className="totals-value" id="cart-subtotal">{total}</div>
                        </div>
                        <div className="totals-item">
                            <label>Tax (5%)</label>
                            <div className="totals-value" id="cart-tax">{total * 0.05}</div>
                        </div>
                        <div className="totals-item">
                            <label>Shipping</label>
                            <div className="totals-value" id="cart-shipping">10.00</div>
                        </div>
                        <div className="totals-item totals-item-total">
                            <label>Grand Total</label>
                            <div className="totals-value" id="cart-total">{(total * 0.05) + 10 + total}</div>
                        </div>
                    </div>

                    <button className="checkout" onClick={() => Navigate("/shipping")}>Checkout</button>

                </div>
                : <EmptyCart />}
        </div>
    )
}

export default Cart