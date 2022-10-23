import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import "./Updatepassword.css"
import { updateYourPassword } from '../../actions/userActions';
const UpdatePassword = () => {
    let [oldpass, setoldpass] = useState("");
    let [password, setpassword] = useState("");
    let [rePassword, setrePassword] = useState("");
    const dispatch = useDispatch();

    const updatePassword = (e) => {
        e.preventDefault();
        // if (!oldpass || !password || !rePassword) {
            dispatch(updateYourPassword(oldpass, password, rePassword));
        // }
    }
    return (
        <center>
            <div className='formwidth'>
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
        </center>
    )
}

export default UpdatePassword