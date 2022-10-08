import React from 'react'
import "./loader.css"
import logo from "../../../images/logo.png"

const Loader = () => {
    return (
        <div className="loadermaindiv">

            <div>

                <center>
                    <img style={{ marginTop: "50px" }} src={logo} alt="" />
                </center>
                <center>

                    <section>
                        <div className="loading loading08">
                            <span data-text="L">L</span>
                            <span data-text="O">O</span>
                            <span data-text="A">A</span>
                            <span data-text="D">D</span>
                            <span data-text="I">I</span>
                            <span data-text="N">N</span>
                            <span data-text="G">G</span>
                        </div>
                    </section>
                </center>


                <div className="sign">
                    <span className="flicker">R</span><span className="flicker">ED&nbsp;</span><span className="flicker">ST</span><span className="flicker">ORE</span>
                </div>

            </div>
        </div>
    )
}

export default Loader
