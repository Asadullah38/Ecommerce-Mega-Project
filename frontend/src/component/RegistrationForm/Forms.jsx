import React, { useState, useEffect } from 'react'
import "./forms.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, registerUser } from '../../actions/userActions';
import { ReactNotifications } from 'react-notifications-component'
import Notification from '../Notification/Notification';
import Loader from '../layout/Loader.jsx/Loader';
const Forms = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    let [loginpage, setloginpage] = useState(true);
    let userDetails = useSelector(state => state.user);
    let { error, user, loading, isAuthenticated } = userDetails;

    //Registration States
    let [rEmail, setrEmail] = useState("");
    let [name, setname] = useState("");
    let [rPassword, setrPassword] = useState("");
    let [repPassword, setrepPassword] = useState("");
    let [avatar, setavatar] = useState("");
    let [avatarurl, setavatarurl] = useState("");
    //Login States
    let [email, setemail] = useState("");
    let [password, setpassword] = useState("");


    //Register User
    const RegisterUser = (e) => {
        e.preventDefault();
        if(!avatar || !rPassword || !name || !rEmail){
            Notification("Error", "Enter Complete Information", "danger");
        }
        else if  (rPassword !== repPassword) {
            Notification("Error", "Passwords Do not Match", "danger");
        }
        else {
            dispatch(registerUser(name, rEmail, rPassword, avatarurl));
        }
    }



    //Login Function
    const loginFunction = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    //useeffect
    useEffect(() => {
        if (error) {
            Notification("Error", error, "danger");
            clearErrors();
        }
        if (isAuthenticated) {
            Navigate("/");
        }
    }, [dispatch, error, isAuthenticated])


    useEffect(() => {
        if (avatar) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setavatarurl(reader.result);
            }
            reader.readAsDataURL(avatar);
        }
    }, [avatar])



    return (
        <div>
            <br />
            <br />
            {!loading ?
                <center>
                    <div className="formwidth" style={{ backgroundColor: "lightsteelblue" }}>

                        <ReactNotifications />

                        {loginpage ?
                            <div>
                                <form className="row g-3">
                                    <h1 className="homeheading">LOG IN FORM</h1>
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
                                        <label className="form-label">Name</label>
                                        <input type="email" className="form-control" value={name} onChange={(e) => { setname(e.target.value) }} id="inputEmail4" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" value={rEmail} onChange={(e) => { setrEmail(e.target.value) }} id="inputEmail4" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Password</label>
                                        <input type="password" className="form-control" value={rPassword} onChange={(e) => { setrPassword(e.target.value) }} id="inputPassword4" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Re-Password</label>
                                        <input type="password" className="form-control" value={repPassword} onChange={(e) => { setrepPassword(e.target.value) }} id="inputCity" />
                                    </div>
                                    <center>

                                        {avatar && <img src={avatarurl ? avatarurl : ""} alt="" height="100px" width="100px" className='mb-3' style={{ objectFit: "cover", borderRadius: "50px" }} />}
                                        <div className="col-md-6">
                                            <label className="form-label">Profile Pic</label>
                                            <input type="file" name="filename" onChange={(e) => setavatar(e.target.files[0])} style={{ border: "1px solid black", cursor: 'pointer', padding: "5px", background: "aqua" }} accept="image/*" />
                                        </div>
                                    </center>

                                    <button className="btn btn-info mb-5" onClick={RegisterUser}>CREATE YOUR ACCOUNT</button>
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