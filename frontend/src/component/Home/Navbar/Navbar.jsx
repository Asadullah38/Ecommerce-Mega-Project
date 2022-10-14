import React, { useState } from 'react'
import "./Navbar.css"
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../actions/productActions';


const Navbar = () => {
    const dispatch = useDispatch();

    let [keyword, setkeyword] = useState("");
    const search = (e) => {
        e.preventDefault();
        dispatch(getProduct(undefined,undefined,undefined,undefined,undefined,keyword))
    }
    return (
        <div>
            <nav className="navbar fixed-top navbar-dark bg-primary">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <img height={'50px'} src={"http://cdn.shopify.com/s/files/1/0556/2515/4621/files/asad_HELL_PNG_LIGHT_be84fb89-18ff-40ad-9a7a-8aae64d3b11d_1200x1200.png?v=1650477703"} alt="" />
                    </li>
                    <li className="nav-item">
                    </li>
                    <li className="nav-item">
                    </li>
                </ul>

                <form className="form-inline my-2 my-lg-0">
                    <input value={keyword} onChange={(e) => { setkeyword(e.target.value) }} className="form-control mr-sm-2" id='searchbar' type="search" placeholder="Search" aria-label="Search" />
                    <button type="submit" id='buttonsubmit' onClick={search} className="btn btn-warning"> Search</button>
                </form>

            </nav>
        </div>
    )
}

export default Navbar