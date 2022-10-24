import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./Updatepassword.css"
import { clearErrors, updateYourPassword } from '../../actions/userActions';
import Notification from "../Notification/Notification";
import { ReactNotifications } from "react-notifications-component";
import Loader from '../layout/Loader.jsx/Loader';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const { loading, error, isUpdated } = useSelector(state => state.updatedProfile);
    let [oldpass, setoldpass] = useState("");
    let [password, setpassword] = useState("");
    let [rePassword, setrePassword] = useState("");

    const updatePassword = (e) => {
        e.preventDefault();
        if (!oldpass || !password || !rePassword) {
            Notification("Error", "Fill All the Fields.", "danger");
        } else {
            dispatch(updateYourPassword(oldpass, password, rePassword));
        }
    }
    
    useEffect(() => {
        if (isUpdated) {
            Notification("Success", "Password updated successfully", "success");
        } else if (error) {
            Notification("Error", error, "danger");
            clearErrors();
        }
    }, [error, isUpdated])

    return (
        <center>
            {loading ? <Loader /> :
                <div className='formwidth'>
                    <ReactNotifications />
                    <form className="row g-3">
                        <h1 className="homeheading">PASSWORD UPDATE</h1>
                        <center>
                            <hr style={{ height: "3px", width: "20%", backgroundColor: "darkblue", opacity: "1" }} className="mb-5" />
                        </center>

                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Old Password" value={oldpass} onChange={(e) => { setoldpass(e.target.value) }} />
                            <label>Old Password</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="New Password" value={password} onChange={(e) => { setpassword(e.target.value) }} />
                            <label> New Password</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Repeat-Password" value={rePassword} onChange={(e) => { setrePassword(e.target.value) }} />
                            <label>Repeat - Password</label>
                        </div>
                        <button className="btn btn-info mt-5" onClick={updatePassword}>Update</button>
                    </form>
                </div>
            }
        </center>
    )
}

export default UpdatePassword