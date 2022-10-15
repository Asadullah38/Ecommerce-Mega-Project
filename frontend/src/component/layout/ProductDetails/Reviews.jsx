import React from 'react'
import MultiCarousel from 'react-multi-carousel';
import { responsive, options } from './objects';
import ReactStars from "react-rating-stars-component"
import 'react-multi-carousel/lib/styles.css';

const Reviews = ({ product }) => {
    return (
        <div>
            <h2 id='ReviewHeading' className='HomeHeading'>{product.reviews.length === 0 ? `NO` : null} REVIEWS</h2>
            <br />
            <center>
                <hr style={{ width: "10%", height: "5px", background: "black" }} />
            </center >
            <br /><br />
            <center>
                <div className="multiCarousel">
                    <MultiCarousel infinite={true} partialVisible={false} responsive={responsive} autoPlay={true} autoPlaySpeed={2000}>
                        {product.reviews.map((item, index) => {
                            return (
                                <div key={index} className="wrapper">
                                    <div className="profile">
                                        <img alt="authorimage" style={{ padding: '5px', borderRadius: "50px" }} src={item.avatar} className="thumbnail" />
                                        <h3 className="name">{item.name}</h3>
                                        <p className="description">{item.comment}</p>
                                        <div className='reactstar'>
                                            <ReactStars {...options} value={item.rating}></ReactStars>
                                            <p className="title">{item.rating} STARS RATING</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </MultiCarousel>
                </div>
            </center>

        </div>
    )
}

export default Reviews
