import React, { useEffect, useState } from 'react'
import Product from "./Product.jsx";
import MetaData from '../layout/MetaData';
import { CgMouse } from "react-icons/cg"
import Pagination, { bootstrap5PaginationPreset } from "react-responsive-pagination";
import { useDispatch } from "react-redux"
import { getProduct } from '../../actions/productActions';
import Loader from '../layout/Loader.jsx/Loader.jsx';



const LandingPage = ({ data }) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { product, error, pageNo, loading } = data;
   
    useEffect(() => {
        setCurrentPage(pageNo);
    }, [])


    // Filter Box States


    //Pagination
    function handlePageChange(page) {
        setCurrentPage(page);
        dispatch(getProduct(page));
        if (product.length >= 1) {
            window.scrollTo({ top: 675, behavior: 'smooth' })
        }
        else {
            window.scrollTo({ top: 200, behavior: 'smooth' })
        }
    }



    return (

        <>{loading ? <Loader /> : <>
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
            <div id="rowflex">
                {(product && product.length >= 1) ? <>
                    <div className="container" id="container">
                        {product && product.map((item, key) => { return <Product product={item} key={item._id} /> })}
                    </div>
                </> : null}
            </div>
            <Pagination
                {...bootstrap5PaginationPreset}
                previousLabel="Prev"
                nextLabel="Next"
                current={currentPage}
                total={3}
                onPageChange={page => handlePageChange(page)}
            />
        </>}
        </>)
}

export default LandingPage