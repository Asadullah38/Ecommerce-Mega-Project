import React, { useState, useEffect } from 'react'
import "./filterbox.css";
import ReactSlider from "react-slider";
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productActions';

const FilterBox = () => {
  const dispatch = useDispatch();
  const currentProduct = useSelector(state => state.product);

  let [min, setmin] = useState(0);
  let [max, setmax] = useState(1000);
  let [ratingAbove, setRatingsAbove] = useState(0);
  let [category, setCategory] = useState("");

  useEffect(() => {

  }, [])
  const data = useSelector(state => state.product);


  const catarray = ["shoes", "sports", "books", "Life"]
  const applyFilterAndSearch = () => {
    dispatch(getProduct(...[,], min, max, ratingAbove));
  }

  return (
    <div id='FilterBox'>
      <h1 style={{ fontFamily: "sans-serif", marginBottom: "30px" }}>Price Range (Rs.)</h1>
      <ReactSlider
        defaultValue={[min, max]}
        className="price-interval-slider"
        trackClassName='tracker'
        min={0}
        max={1000}
        step={1}
        withTracks={true}
        pearling={true}
        renderThumb={(props) => {
          return <div {...props} className="price-interval-thumb"></div>
        }}
        renderTrack={(props) => {
          return <div {...props} className="price-interval-track"></div>
        }}
        onChange={([min, max]) => {
          setmin(min)
          setmax(max)
        }}
      />
      <div style={{ fontFamily: "sans-serif", marginTop: "20px" }}>
        <span id="minspan">{min}</span>
        <span id="maxspan">{max}</span>
      </div>


      {/* Select Category */}
      {/* <center>

        <div className="box">
          <select value={category} onChange={(e) => { setCategory(e.target.selectedIndex);console.log(category) }}>
            {catarray.map((item) => {
              return <option value={item}>{item}</option>
            })}
          </select>
        </div>
      </center> */}
      {/*Range of Reviews*/}
      <h1 style={{ fontFamily: "sans-serif", marginBottom: "30px" }}>Ratings Above</h1>
      <ReactSlider
        defaultValue={ratingAbove}
        className="price-interval-slider"
        trackClassName='tracker'
        min={0}
        max={5}
        step={0.5}
        withTracks={true}
        pearling={true}
        renderThumb={(props) => {
          return <div {...props} className="price-interval-thumb"></div>
        }}
        renderTrack={(props) => {
          return <div {...props} className="price-interval-track"></div>
        }}
        onChange={(ratingAbove) => {
          setRatingsAbove(ratingAbove);
        }}
      />
      <div style={{ fontFamily: "sans-serif", marginTop: "20px" }}>
        <span id="ratingspan">{ratingAbove}</span>
      </div>




      <div onClick={applyFilterAndSearch} className="button2">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Search
      </div>




    </div>
  )
}

export default FilterBox
