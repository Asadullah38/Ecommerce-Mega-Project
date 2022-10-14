import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./ProductDetails.css";
import ReactStars from "react-rating-stars-component"
import Loader from '../Loader.jsx/Loader';
import Reviews from './Reviews';
import ReactAlerts from '../Alerts/ReactAlerts';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../../actions/productActions';


const ProductDetails = ({ product }) => {
    const options = {
        isHalf: true,
        edit: false,
        value: product && product.ratings,
        color: "lightgrey",
        activeColor: "orange",
        size: window.innerWidth < 600 ? 20 : 25,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    }

    let [qty, setQty] = useState(1)
    let [unit, setunit] = useState(product && product.price);
    let [price, setprice] = useState(product && product.price);
    let [ShowReviews, setShowReviews] = useState(false);
    let [ratings, setratings] = useState(product && product.ratings);
    useEffect(() => {
        setprice(unit * qty);
    })

    const showReviews = () => {
        setShowReviews(!ShowReviews);
    }

    return (
        <>



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
                            <h2 className='HomeHeading' id='HomeHeading'>&nbsp;&nbsp; {product.ratings.toPrecision(2)}  Stars Ratings</h2>
                            {product && <ReactStars {...options} />}
                        </div>
                        <hr />
                        <div id="rowDirection">
                            <h2 className='HomeHeading' id='HomeHeading'>Rs. &nbsp;{price}</h2>
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

                {/* Reviews */}
                {ShowReviews ? <Reviews product={product} /> : null}

            </div>
            {/* <ReactAlerts error={error} type="error" title="Error" quoteString="Product Not Found." />
            {navigate("/")} <h1>Product Not Found. Come Back Later.</h1> */}
        </>
    )
}

export default ProductDetails
