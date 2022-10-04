import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg"
import "./Home.css";
import Footer from "../layout/footer/Footer";
import Product from "./Product.jsx";
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from "react-redux"
import { getProduct } from '../../actions/productActions';
import axios from 'axios';

const Home = () => {
    const dispatch = useDispatch();

    const product = {
        images: [{ url: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHNoaXJ0fGVufDB8fDB8fA%3D%3D&w=1000&q=80" }],
        name: "Blue T-Shirt",
        price: "10.00$",
        _id: "asad"
    }


    useEffect(() => {
      dispatch(getProduct())

    }, [dispatch])



    return (<>
        <MetaData title="Ecommerce Red Store" />
        <div className="banner">
            <p>
                Welcome to Ecommerce Red Store
            </p>
            <h1>
                FIND AMAZING PRODUCTS BELOW
            </h1>
            <a href="#container">
                <button >scroll <CgMouse /></button>
            </a>
        </div>
        <h2 className="homeHeading">Featured Products</h2>

        <div className="container" id="container">
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
        </div>
        {/* Footer */}
        <div id='footerdiv'>
            <Footer />
        </div>
    </>
    )
}

export default Home
