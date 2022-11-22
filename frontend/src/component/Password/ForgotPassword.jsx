import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Loader from '../layout/Loader.jsx/Loader';
import Notification from "../Notification/Notification";
import { ReactNotifications } from "react-notifications-component";
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../actions/userActions';
import "./ForgotPassword.css";
import { clearErrors } from '../../actions/userActions';
const ForgotPassword = () => {
    const { loading, error, message } = useSelector(state => state.updatedProfile);
    console.log(message);
    const [email, setemail] = useState("");
    const dispatch = useDispatch();

    //Function for forgot password
    const forgotPasswordFunction = (e) => {
        e.preventDefault();
        if (!email) {
            Notification("Error", "Enter a valid Email", "danger")
        }
        dispatch(forgotPassword(email))
    }
    useEffect(() => {
        if (message) {
            Notification("Success", `Email Sent Successfully.`, "success");
            setemail("");
        } else if (error) {
            Notification("Error", error, "danger");
            clearErrors();
        }
    }, [error, message, loading])
    return (
        <div>
            {loading ? <Loader /> :
                <center>
                    <div className='formwidth'>
                        <ReactNotifications />
                        <form className="row g-3">
                            <h1 className="homeheading">FORGOT PASSWORD</h1>
                            <center>
                                <hr style={{ height: "3px", width: "20%", backgroundColor: "darkblue", opacity: "1" }} className="mb-5" />
                            </center>

                            <div className="form-floating">
                                <input type="email" className="form-control" id="floatingPassword" placeholder="Enter Your Email." value={email} onChange={(e) => { setemail(e.target.value) }} />
                                <label>Email</label>
                            </div>
                            {message ? <h6>Kindly Check Your Mail Box</h6> : <h6>Kindly Wait after sending request. This can take upto 2 minutes. </h6>}
                            <button className="btn btn-info mt-5" onClick={forgotPasswordFunction} >Update</button>
                        </form>
                    </div>
                </center>}

        </div>
    )
}

export default ForgotPassword