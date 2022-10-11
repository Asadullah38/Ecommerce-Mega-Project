import React, { useEffect, useState } from 'react'
import Product from "./Product.jsx";
import MetaData from '../layout/MetaData';
import { CgMouse } from "react-icons/cg"
import ReactAlerts from '../layout/Alerts/ReactAlerts';
import Pagination, { bootstrap5PaginationPreset } from "react-responsive-pagination";
import { useDispatch } from "react-redux"
import { getProduct } from '../../actions/productActions';
import FilterBox from '../Filters/FilterBox.jsx';




const LandingPage = ({ data }) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { product, error, pageNo, queries } = data;
    console.log(queries);
    useEffect(() => {
        setCurrentPage(pageNo);
    }, [])


    // Filter Box States

    let [min, setmin] = useState(queries && queries.price.gte);
    let [max, setmax] = useState(queries && queries.price.lte);
    let [ratingAbove, setRatingsAbove] = useState(queries && queries.ratings.gte);
    let [category, setCategory] = useState(queries && queries.category);

    //Pagination
    function handlePageChange(page) {
        setCurrentPage(page);
        dispatch(getProduct(page, min, max, ratingAbove, category));
        if (product.length >= 1) {
            window.scrollTo({ top: 675, behavior: 'smooth' })
        }
        else {
            window.scrollTo({ top: 200, behavior: 'smooth' })
        }
    }

    //applyFilterAndSearch
    function applyFilterAndSearch() {
        dispatch(getProduct(currentPage, min, max, ratingAbove, category));
    }


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
            <div id="rowflex">
                <center>
                    <FilterBox applyFilterAndSearch={applyFilterAndSearch} min={min} max={max} setmin={setmin} setmax={setmax} setRatingsAbove={setRatingsAbove} ratingAbove={ratingAbove} category={category} setCategory={setCategory} />
                </center>
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
                total={5}
                onPageChange={page => handlePageChange(page)}
            />
        </>)
}

export default LandingPage