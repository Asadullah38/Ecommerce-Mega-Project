import React, { useState } from 'react'
import "./Navbar.css"
import { useSelector, useDispatch } from 'react-redux';
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { logout } from '../../../actions/userActions';
import { Link } from 'react-router-dom';
import { ReactNotifications } from "react-notifications-component";
const Navbar = () => {
    const dispatch = useDispatch();
    let userDetails = useSelector(state => state.user);
    let { isAuthenticated, user } = userDetails;
    const logoutFunction = () => {
        dispatch(logout());
            alert("logged out Successfully");
    }

    return (
        <div>
            {!isAuthenticated && <ReactNotifications />}
            <nav className="navbar fixed-top navbar-dark bg-primary">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <img style={{ borderRadius: "70%" }} className="ms-2" height={'50px'} src={!isAuthenticated ? "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" : user.avatar.url} alt="" />

                    </li>
                </ul>

                {isAuthenticated ?
                    <button className='btn btn-info me-5' onClick={logoutFunction}>LOGOUT</button> : <Link to="/form"><button className='btn btn-info me-5'>LOGIN</button></Link>}
            </nav>
        </div>
    )

}

export default Navbar;