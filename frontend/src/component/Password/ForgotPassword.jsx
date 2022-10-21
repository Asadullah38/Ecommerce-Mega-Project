import React,{useState} from 'react'
import "./ForgotPassword.css";
const ForgotPassword = () => {
    const [email, setemail] = useState("");

    return (
        <div>
            <center>
                <div className='formwidth'>
                    <form className="row g-3">
                        <h1 className="homeheading">FORGOT PASSWORD</h1>
                        <center>
                            <hr style={{ height: "3px", width: "20%", backgroundColor: "darkblue", opacity: "1" }} className="mb-5" />
                        </center>

                        <div className="form-floating">
                            <input type="email" className="form-control" id="floatingPassword" placeholder="Enter Your Email." value={email} onChange={(e) => { setemail(e.target.value) }} />
                            <label>Email</label>
                        </div>
                        <button className="btn btn-info mt-5" >Update</button>
                    </form>
                </div>
            </center>

        </div>
    )
}

export default ForgotPassword