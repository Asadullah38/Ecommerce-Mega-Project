import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { getProduct } from "../../actions/productActions";


const Search = () => {
    const dispatch = useDispatch();
    let [keyword, setkeyword] = useState("");

    const search = (e) => {
        e.preventDefault();
        dispatch(getProduct(undefined, undefined, undefined, undefined, undefined, keyword));
    }

    const logout=()=>{

    }
    return (
        <div>

            <form className="form-inline mt-2 mb-2">
                <input value={keyword} onChange={(e) => { setkeyword(e.target.value) }} className="form-control mb-2 mr-sm-2" id='searchbar' type="search" placeholder="Search" aria-label="Search" />
                <button type="submit" id='buttonsubmit' onClick={search} className="btn btn-info"> Search</button>
            </form>
        </div>
    )
}

export default Search