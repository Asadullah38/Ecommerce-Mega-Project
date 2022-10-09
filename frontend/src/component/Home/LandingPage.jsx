import React from 'react'
import Product from "./Product.jsx";
import MetaData from '../layout/MetaData';
import { CgMouse } from "react-icons/cg"
import ReactAlerts from '../layout/Alerts/ReactAlerts';
import ReactSlider from "react-slider";
import Typography from "react-typography";

const LandingPage = ({ data }) => {

    const { product, error } = data;

    return (

        <>
            <ReactAlerts error={error} type="error" title="Timed out" quoteString="Connection Timed out. Items Loading unsuccessful." />
            <MetaData title="Ecommerce Red Store" />
            <div className="banner">
                <p>
                    Welcome to Ecommerce Red Store
                </p>
                <h1>
                    FIND AMAZING {product ? product.length : null} PRODUCTS BELOW
                </h1>
                <a href="#container">
                    <button >scroll <CgMouse /></button>
                </a>
            </div>

            <h2 className="homeHeading">Featured Products</h2>
            <center>
                <div id="react-slider">
                    
                </div>
            </center>
            <div className="container" id="container">
                {product && product.map((item, key) => { return <Product product={item} key={item._id} /> })}
            </div>

        </>)
}

export default LandingPage