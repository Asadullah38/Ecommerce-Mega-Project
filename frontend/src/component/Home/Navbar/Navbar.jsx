import React from 'react'
import "./Navbar.css"
import { useSelector, useDispatch } from 'react-redux';
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { logout } from '../../../actions/userActions';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const dispatch = useDispatch();
    let userDetails = useSelector(state => state.user);
    let { isAuthenticated, user, loading } = userDetails;
    const logoutFunction = () => {
        dispatch(logout());
        alert("logged out Successfully");
    }

    return (
        <div>
            <nav className="navbar fixed-top navbar-dark bg-primary">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

                    <li className="nav-item active">
                        {!loading && isAuthenticated ? <img style={{ borderRadius: "70%" }} className="ms-2" height={'50px'} src={user.avatar.url} alt="" /> : !isAuthenticated && <img style={{ borderRadius: "70%" }} className="ms-2" height={'50px'} src={"https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"} alt="" />}
                    </li>
                </ul>

                {isAuthenticated ?
                    <button className='btn btn-info me-5' onClick={logoutFunction}>LOGOUT</button> : <Link to="/login"><button className='btn btn-info me-5'>LOGIN</button></Link>}
            </nav>
        </div>
    )

}

export default Navbar;