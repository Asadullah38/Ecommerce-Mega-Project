import React, { useEffect } from 'react'
import "./Profile.css"
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { loadUser } from '../../actions/userActions';


const Profile = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.user);
    const { isUpdated } = useSelector(state => state.updatedProfile);

    useEffect(() => {
dispatch(loadUser);
    }, [dispatch])

    return (
        <div id='ProfilBody'>
            <div className="container emp-profile">
                <form method="post">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                {!loading && <img src={user.avatar.url || "https://bootdey.com/img/Content/avatar/avatar7.png"} alt="" />}
                                <Link to={"/UpdateProfile"}>
                                    <div style={{ cursor: "pointer" }} className="file mb-5 btn btn-lg btn-primary mt-1">
                                        Change Photo
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>
                                    {user.name}
                                </h5>
                                <h6>
                                    Web Developer
                                </h6>
                                <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-link">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2" >
                            <Link to="/UpdateProfile">
                                <button type="button" style={{ cursor: "pointer", width: '180px', color: 'white', fontWeight: "bolder" }} className="btn btn-info">Update Profile</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-work">
                                <div className="col-md-2" >
                                    <Link to="/Orders">
                                        <button type="button" style={{ cursor: "pointer", width: '150px', fontSize: "12px", color: 'white', fontWeight: "bolder" }} className="btn btn-info">My Orders</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="profile-work">
                                <div className="col-md-2" >
                                    <Link to="/ChangePassword">
                                        <button type="button" style={{ cursor: "pointer", width: '150px', fontSize: "12px", color: 'white', fontWeight: "bolder" }} className="btn btn-info">Change Password</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>User Id</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user._id}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user.name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Profession</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>MERN Stack Web Developer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile