import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import image from "../../../images/1.jpg"
import image1 from "../../../images/4.jpg"
import image2 from "../../../images/3.jpg"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./ProductDetails.css";
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../../actions/productActions';
import { options } from './objects';
import Loader from '../Loader.jsx/Loader';
import Reviews from './Reviews';
import ReactAlerts from '../Alerts/ReactAlerts';


const ProductDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const currentProduct = useSelector(state => state.productDetails);
    const { loading, product, error } = currentProduct;
    const dispatch = useDispatch();



    const images = [image, image1, image2]
    let [qty, setQty] = useState(1)
    let unit = product && product.price;
    let [price, setprice] = useState(unit);
    let [ShowReviews, setShowReviews] = useState(false);


    useEffect(() => {
        setprice(qty * unit);
    }, [qty])


    useEffect(() => {
        dispatch(getProductDetails(params.id));
    }, [dispatch])


    const showReviews = () => {
        setShowReviews(!ShowReviews);
    }

    return (
        <>



            {!loading && !error && product ? (
                <div id="Reviews">
                    <div id='ProductDetailsMain'>
                        {/* Carousel */}
                        <div id='Carousel'>
                            <Carousel verticalSwipe='natural' showIndicator={false} autoFocus={true} transitionTime={1500} autoPlay={true} interval={3000} infiniteLoop={true} showArrows={false}>
                                {product.images.map((item, key) => {
                                    return (
                                        <div key={key}>
                                            <img alt='ProductImage' src={item.url} />
                                            <p className="legend">{product.name} Image {key + 1}</p>
                                        </div>
                                    )
                                })}
                            </Carousel>
                        </div>

                        {/* //Description */}
                        <div id="ProductFunctions">
                            <h2 id='ProductTitle'>{product.name}</h2>
                            <hr />
                            <div id="ReviewStars">
                                <ReactStars {...options} value={product && product.ratings} />
                                <h2 className='HomeHeading' id='HomeHeading'>&nbsp;&nbsp; {product.ratings.toPrecision(2)}  Ratings</h2>
                            </div>
                            <hr />
                            <div id="rowDirection">
                                <h2 className='HomeHeading' id='HomeHeading'>Rs. &nbsp;{price || product.price}</h2>
                                <button className="qtychange" disabled={(qty === 1) ? true : false} id="minus" onClick={() => setQty(qty - 1)}>-</button>
                                <h2 className='HomeHeading'>{qty}</h2>
                                <button className="qtychange" disabled={(qty === 5) ? true : false} id="plus" onClick={() => setQty(qty + 1)}>+</button>
                                <button id='CartButton'>Add to Cart</button>
                            </div>
                            <hr />
                            <div id="rowDirection">
                                <h2 className='HomeHeading' id='HomeHeading'>Status:</h2>
                                <h2 style={(product.stock !== 0) ? { color: "blue" } : { color: "red" }}>{(product.stock !== 0) ? "In Stock" : "Out of Stock"}</h2>
                            </div>
                            <hr />
                            <div id="Description">
                                <h2 className='HomeHeading' id='HomeHeading'>Description :</h2>
                                <p id="DescPara">{product.description}</p>
                            </div>
                            <div id="rowDirection">

                                <button id='CartButton'>Submit Review</button>
                                <button id='CartButton' onClick={showReviews}>{ShowReviews ? `Hide Reviews` : `Show Reviews`}</button>
                            </div>
                        </div>



                    </div>
                    <br /><br /><br /><br />

                    {/* Reviews */}
                    {ShowReviews ? <Reviews product={product} /> : null}

                </div>) : error ? <>
                    <ReactAlerts error={error} type="error" title="Error" quoteString="Product Not Found." />
                    {navigate("/")}</> : loading ? <Loader /> : <h1>Product Not Found. Come Back Later.</h1>}
        </>
    )
}

export default ProductDetails
