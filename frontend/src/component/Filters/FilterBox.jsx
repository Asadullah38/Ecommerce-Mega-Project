import React, { useState } from 'react'
import "./filterbox.css";
import ReactSlider from "react-slider";

const FilterBox = ({ min, max, setmin, setmax, ratingAbove, setRatingsAbove, category, setCategory, applyFilterAndSearch }) => {
  const catarray = ["Shoes", "Sports", "Books", "Life"]
  let [filtermode, setfiltermode] = useState(false);


  return (
    <div>
      <div className="button2" onClick={() => { setfiltermode(!filtermode) }}><span></span><span></span><span></span><span></span>{filtermode ? `Hide` : `Add`} Filters</div>
      {filtermode ? (
        <div id='FilterBox'>
          <h1 id="categoryhead" style={{ fontFamily: "sans-serif", marginBottom: "30px", padding: "10px", border: "1px solid black", width: "50%" }}>Price Range (Rs.)</h1>

          <ReactSlider
            className="price-interval-slider"
            trackClassName='tracker'
            defaultValue={[Number(min),Number(max)]}
            min={0}
            max={25000}
            step={50}
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

          <hr style={{ marginTop: "50px", marginBottom: "30px" }} />
          {/* Select Category */}
          <center>
            <div className="box">
              <div className="button2">
                <span></span>
                <span></span>
                <span></span>
                <h1 id='categoryhead'>Select Category</h1>
                <br />
                <select value={category} onChange={(e) => { setCategory(e.target.options[e.target.selectedIndex].text); }}>
                  <option value={"category"}>All</option>
                  {catarray.map((item, index) => {
                    return <option key={index} value={item}>{item}</option>
                  })}
                </select>
              </div>
            </div>
          </center>
          {/*Range of Reviews*/}
          <hr style={{ marginTop: "20px", marginBottom: "50px" }} />

          <div>
            <h1 id="categoryhead" style={{ padding: "10px", border: "1px solid black", width: "50%", fontFamily: "sans-serif", marginBottom: "30px", }}>Ratings Above</h1>
            <ReactSlider
              defaultValue={Number(ratingAbove)}
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
          </div>


          <hr style={{ marginTop: "50px", marginBottom: "30px" }} />


          <div onClick={applyFilterAndSearch} className="button2">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Search
          </div>




        </div>) : null}
    </div>
  )
}

export default FilterBox
