import React, { useState, useEffect } from 'react'
import { ReactNotifications } from 'react-notifications-component';
import Loader from '../layout/Loader.jsx/Loader';
import { useSelector, useDispatch } from 'react-redux';
import Notification from '../Notification/Notification';
import "./ResetPassword.css";
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../actions/userActions';

const ResetPassword = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, error, isUpdated } = useSelector(state => state.updatedProfile);
    let [password, setpassword] = useState("");
    let [rePassword, setrePassword] = useState("");


    //ResetPassword Function on Click Event
    const resetPasswordFunction = (e) => {
        e.preventDefault();
        dispatch(resetPassword(password, rePassword, params.token));
    }
    //use Effect
    useEffect(() => {
        if (isUpdated) {
            Notification("Success", "Password Reset Successfully", "success")
            setpassword("");
            setrePassword("");
        }
        else if (error) {
            Notification("Error", error, "danger")
        }
    }, [error, isUpdated])

    return (
        <div>
            <center>
                {loading ? <Loader /> :
                    <div className='formwidth'>
                        <ReactNotifications />
                        <form className="row g-3">
                            <h1 className="homeheading">PASSWORD RESET</h1>
                            <center>
                                <hr style={{ height: "3px", width: "20%", backgroundColor: "darkblue", opacity: "1" }} className="mb-5" />
                            </center>

                            <div className="form-floating">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="New Password" value={password} onChange={(e) => { setpassword(e.target.value) }} />
                                <label> New Password</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Repeat-Password" value={rePassword} onChange={(e) => { setrePassword(e.target.value) }} />
                                <label>Repeat - Password</label>
                            </div>
                            {isUpdated ? <h6>Password Reset Successfully.</h6> : null}
                            <button className="btn btn-info mt-5" onClick={resetPasswordFunction}>Update</button>
                        </form>
                    </div>
                }
            </center>
        </div>
    )
}

export default ResetPassword