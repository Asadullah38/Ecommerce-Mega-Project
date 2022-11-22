import React from 'react'
import { useSelector } from 'react-redux';
import "./Cart.css";
import CartProduct from './CartProduct';

const Cart = () => {
    const cartItems = useSelector(state => state.cart.cartItems);

    return (
        <div>

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
                        <div className="totals-value" id="cart-subtotal">71.97</div>
                    </div>
                    <div className="totals-item">
                        <label>Tax (5%)</label>
                        <div className="totals-value" id="cart-tax">3.60</div>
                    </div>
                    <div className="totals-item">
                        <label>Shipping</label>
                        <div className="totals-value" id="cart-shipping">15.00</div>
                    </div>
                    <div className="totals-item totals-item-total">
                        <label>Grand Total</label>
                        <div className="totals-value" id="cart-total">90.57</div>
                    </div>
                </div>

                <button className="checkout">Checkout</button>

            </div>
        </div>
    )
}

export default Cart