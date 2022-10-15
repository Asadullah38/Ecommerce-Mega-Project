import React, { useState, useEffect } from 'react'
import "./forms.css";
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from '../../actions/userActions';
import { ReactNotifications } from 'react-notifications-component'
import Notification from '../Notification/Notification';
import Loader from '../layout/Loader.jsx/Loader';
const Forms = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    let [loginpage, setloginpage] = useState(true);
    let userDetails = useSelector(state => state.user);
    let { error, user, loading, isAuthenticated } = userDetails;
    //Login States
    let [email, setemail] = useState("");
    let [password, setpassword] = useState("");

    //Login Function
    const loginFunction = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        showNotifications();
        

    }

    //useeffect
    useEffect(() => {
        if (error) {
            Notification("Error", error, "danger");
            clearErrors();
        }
        console.log(isAuthenticated);
        if (isAuthenticated) {
            Notification("Success", "Successfully Logged In", "success");
            Navigate("/products");
        }

    }, [dispatch, error,isAuthenticated])


    //Show Notification
    const showNotifications = () => {
        if (error) {
        } else if (isAuthenticated && user) {
            Notification("Success", "Logged In Successfully", "success");
        }
    }


    return (
        <div>
            <br />
            <br />
            {!loading ?
                <center>
                    <div className="formwidth" style={{ backgroundColor: "lightsteelblue" }}>


                        {loginpage ?
                            <div>
                                <ReactNotifications />
                                <form className="row g-3">
                                    <h1 className="homeheading">SIGN IN FORM</h1>
                                    <center>
                                        <hr style={{ height: "3px", width: "20%", backgroundColor: "darkblue", opacity: "1" }} className="mb-5" />
                                    </center>
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => { setemail(e.target.value) }} />
                                        <label>Email address</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => { setpassword(e.target.value) }} />
                                        <label>Password</label>
                                    </div>
                                    <button className="btn btn-info mt-5" onClick={loginFunction}>Login</button>
                                </form>
                                <button className="btn btn-info mt-5" onClick={() => { setloginpage(!loginpage) }}>Register</button>
                            </div>

                            :

                            <div>
                                <form className="row g-3">
                                    <h1 className="homeheading">SIGN UP FORM</h1>
                                    <center>
                                        <hr style={{ height: "3px", width: "20%", backgroundColor: "darkblue", opacity: "1" }} />
                                    </center>
                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" id="inputEmail4" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Password</label>
                                        <input type="password" className="form-control" id="inputPassword4" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">City</label>
                                        <input type="text" className="form-control" id="inputCity" />
                                    </div>
                                    <button className="btn btn-info mb-5">CREATE YOUR ACCOUNT</button>
                                </form>
                                <button className="btn btn-info" onClick={() => { setloginpage(!loginpage) }}>LOGIN</button>
                            </div>
                        }




                    </div>
                </center> : <Loader />}
        </div >
    )
}

export default Forms;