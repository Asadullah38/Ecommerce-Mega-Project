import React, { useEffect, useState } from 'react'
import "./updateProfile.css"
import { useSelector, useDispatch } from "react-redux";
import ProfileLogo from "@mui/icons-material/Person"
import { clearErrors, loadUser, updateProfile } from '../../actions/userActions';
import Loader from "../layout/Loader.jsx/Loader";
import Notification from "../Notification/Notification";
import { ReactNotifications } from "react-notifications-component";
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const Navigate = useNavigate();
    const { user } = useSelector(state => state.user);
    const data = useSelector(state => state.updatedProfile);
    const { updatedProfile, loading, error, isUpdated } = data;
    const dispatch = useDispatch();
    let [name, setname] = useState(user && user.name);
    let [avatar, setavatar] = useState("");
    let [avatarurl, setavatarurl] = useState("");


    useEffect(() => {
        if (avatar) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setavatarurl(reader.result);
            }
            reader.readAsDataURL(avatar);
        }
    }, [avatar])

    //useeffect
    useEffect(() => {
        if (!loading && error) {
            Notification("Error", error, "danger");
            clearErrors();
        }
        else if (!loading && isUpdated) {
            Navigate("/Profile");
        }
    }, [dispatch, error, isUpdated])









    const updateProfileFunction = (e) => {
        e.preventDefault();
        if (!name || !avatar) {
            Notification("Error", "Enter a Name and Select an Image.", "danger");
        } else {
            dispatch(updateProfile(name, avatarurl));
        }
    }

    return (
        <>{loading ? <Loader /> :
            <div id='ProfileBody'>
                {!loading && <ReactNotifications />}
                <div className="flex-column ">
                    <hr />
                    <div className="row">
                        <div className="col-md-3">
                            <div className="text-center">
                                <img style={{ objectFit: "cover", borderRadius: "50%", border: "3px solid white" }} src={avatarurl || user.avatar.url} className="avatar" alt="avatar" />
                                <br />
                                <br />

                                <h6>Upload a different photo...</h6>
                                <input type="file" accept='image/*' className="form-control" onChange={(e) => setavatar(e.target.files[0])} />
                            </div>
                        </div>

                        <div className="col-md-9 personal-info mt-4">
                            <div className=" col-md-5 alert alert-info alert-dismissable">
                                <center>
                                    <h3><ProfileLogo /> Personal info</h3>
                                </center>
                            </div>

                            <form className="form-horizontal" role="form">
                                <div className="form-group mb-2 ">
                                    <label className="col-lg-3 mb-2 mt-2 control-label">Name:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="text" value={name} onChange={(e) => setname(e.target.value)} />
                                    </div>
                                </div>


                                <button className='btn btn-info mt-4' onClick={updateProfileFunction}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <hr />

            </div>}
        </>
    )
}

export default UpdateProfile