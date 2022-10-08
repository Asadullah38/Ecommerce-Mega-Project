import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import image from "../../../images/1.jpg"
import image1 from "../../../images/4.jpg"
import image2 from "../../../images/3.jpg"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./ProductDetails.css";
import ReactStars from "react-rating-stars-component"
import MultiCarousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../../actions/productActions';

const ProductDetails = () => {
    const params = useParams();
    const data = useSelector(state => state.productDetails);
    const dispatch = useDispatch();
    const options = {
        edit: false,
        color: "lightgrey",
        activeColor: "orange",
        value: 4,
        size: window.innerWidth < 600 ? 20 : 25,
        isHalf: true,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    }
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const images = [image, image1, image2]
    let [qty, setQty] = useState(1)
    const unit = 10;
    let [price, setprice] = useState(unit)
    let [status, setstatus] = useState("Out Of Stock")


    useEffect(() => {
        setprice(qty * unit);
    }, [qty])

    useEffect(() => {
        dispatch(getProductDetails(params.id));
    }, [dispatch])


    function changeQty(e) {
        const change = e.target.id;
        if (change === "minus") {
            setQty(qty - 1);
        }
        else if (change === "plus") {
            setQty(qty + 1);
        }
    }
    return (
        <div id="Reviews">

            <div id='ProductDetailsMain'>
                {/* Carousel */}
                <div id='Carousel'>
                    <Carousel verticalSwipe='natural' showIndicator={false} autoFocus={true} transitionTime={1500} autoPlay={true} interval={3000} infiniteLoop={true} showArrows={false}>
                        {images.map((item, index) => {
                            return (
                                <div key={index}>
                                    <img alt='ProductImage' src={item} />
                                    <p className="legend">Image {index + 1}</p>
                                </div>
                            )
                        })}
                    </Carousel>
                </div>

                {/* //Description */}
                <div id="ProductFunctions">
                    <h2 id='ProductTitle'>Laptop hp core i9 11th Gen.</h2>
                    <hr />
                    <div id="ReviewStars">
                        <ReactStars {...options} />
                        <h2 className='HomeHeading' id='HomeHeading'>&nbsp;&nbsp; {options.value.toPrecision(2)}  Reviews</h2>
                    </div>
                    <hr />
                    <div id="rowDirection">
                        <h2 className='HomeHeading' id='HomeHeading'>Rs. &nbsp;{price}</h2>
                        <button className="qtychange" disabled={(qty === 1) ? true : false} id="minus" onClick={changeQty}>-</button>
                        <h2 className='HomeHeading'>{qty}</h2>
                        <button className="qtychange" disabled={(qty === 5) ? true : false} id="plus" onClick={changeQty}>+</button>
                        <button id='CartButton'>Add to Cart</button>
                    </div>
                    <hr />
                    <div id="rowDirection">
                        <h2 className='HomeHeading' id='HomeHeading'>Status:</h2>
                        <h2 style={(status == "In Stock") ? { color: "blue" } : { color: "red" }}>{status}</h2>
                    </div>
                    <hr />
                    <div id="Description">
                        <h2 className='HomeHeading' id='HomeHeading'>Description :</h2>
                        <p id="DescPara">ASKDF ASDF ASFASDD FSADF ASDFASD FASD FSADF ASDFASD FASDF ASDF ASDF ASDF DASKDF ASDF ASFASDD FSADF ASDFASD FASDF ASDF ASDFASFASDD FSADF ASDFASD FASDF ASDF ASDF ASDF D</p>
                    </div>
                    <button id='CartButton'>Submit Review</button>
                </div>


                {/* Reviews */}

            </div>
            <br /><br /><br /><br />
            <h2 id='ReviewHeading' className='HomeHeading'>REVIEWS</h2>
            <br /><center>

            <hr style={{width:"10%",height:"5px",background:"black"}}/>
            </center>
            <br /><br />
            <center>

                <MultiCarousel infinite={true} partialVisible={false} responsive={responsive} autoPlay={true} autoPlaySpeed={2000}>

                    <div className="wrapper">
                        <div className="profile">
                            <img alt="authorimage" style={{ padding: '5px', width: '140px', height: "140px", borderRadius: "50%" }} src="https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?w=2000" className="thumbnail" />
                            <h3 className="name">Beverly Little</h3>
                            <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aliquam aliquid porro!</p>
                            <div className='reactstar'>
                                <ReactStars {...options}></ReactStars>
                                <p className="title">5 STARS RATING</p>
                            </div>
                        </div>
                    </div>

                    <div className="wrapper">
                        <div className="profile">
                            <img alt="authorimage" style={{ padding: '5px', width: '140px', height: "140px", borderRadius: "50%" }} src="https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?w=2000" className="thumbnail" />
                            <h3 className="name">Beverly Little</h3>
                            <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aliquam aliquid porro!</p>
                            <div className='reactstar'>
                                <ReactStars {...options}></ReactStars>
                                <p className="title">5 STARS RATING</p>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper">
                        <div className="profile">
                            <img alt="authorimage" style={{ padding: '5px', width: '140px', height: "140px", borderRadius: "50%" }} src="https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?w=2000" className="thumbnail" />
                            <h3 className="name">Beverly Little</h3>
                            <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aliquam aliquid porro!</p>
                            <div className='reactstar'>
                                <ReactStars {...options}></ReactStars>
                                <p className="title">5 STARS RATING</p>
                            </div>
                        </div>
                    </div>



                </MultiCarousel>
            </center>



        </div>
    )
}

export default ProductDetails
