import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg"
import "./Home.css";
import Footer from "../layout/footer/Footer";
import Product from "./Product.jsx";
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from "react-redux"
import { getProduct } from '../../actions/productActions';
import Loader from '../layout/Loader/Loader';

const Home = () => {
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    const { loading, product, productCount } = useSelector(state => state.products);
    console.log(loading);

    return (
        <>
            {!loading ?
                <Fragment>
                    <Loader />
                </Fragment> : <>
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
                    <div className="container" id="container">
                        {product && product.map((item, key) => { return <Product product={item} key={item._id} /> })}
                    </div>
                    {/* Footer */}
                    <div id='footerdiv'>
                        <Footer />
                    </div>
                </>}
        </>
    )
}

export default Home
