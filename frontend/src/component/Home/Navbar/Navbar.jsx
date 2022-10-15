import React, { useState } from 'react'
import "./Navbar.css"
import { useSelector, useDispatch } from 'react-redux';
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";


const Navbar = () => {
    const dispatch = useDispatch();
    let userDetails = useSelector(state => state.user);
    let { isAuthenticated, user } = userDetails;
    
    return (
        <div>
            <nav className="navbar fixed-top navbar-dark bg-primary">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <img style={{ borderRadius: "70%" }} className="ms-2" height={'50px'} src={isAuthenticated ? user.avatar.url : `http://cdn.shopify.com/s/files/1/0556/2515/4621/files/asad_HELL_PNG_LIGHT_be84fb89-18ff-40ad-9a7a-8aae64d3b11d_1200x1200.png?v=1650477703`} alt="" />
                    </li>
                </ul>

                {isAuthenticated ?
                    <button className='btn btn-info me-5'>LOGOUT</button> : null}
            </nav>
        </div>
    )
}

export default Navbar