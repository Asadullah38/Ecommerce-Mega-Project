import React from "react";
import playstore from "../../../images/playstore.png";
import appstore from "../../../images/appstore.png";
import logoredstore from "../../../images/logoredstore.png";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="foot">
            <div className="footer">
                <div className="c2">
                    <img alt="img" src={logoredstore} className="logofooter" />
                </div>
                <div className="c1">
                    <h2 id="fh2">Download our app</h2>
                    <p id="fp2"> You can download our android and ios app.</p>
                    <img alt="img" src={playstore} />
                    <img alt="img" src={appstore} />
                </div>

                <div className="c4">
                    <h2 id="fh2">Follow Us</h2>
                    <ul id="ul" style={{ "padding": '0px' }}>
                        <li className="lis" id="l4">
                            <a rel="noreferrer" className="links" target={"_blank"} href="https://github.com/MAsadMughal">
                                <FaGithub id="Github" /> Github
                            </a>
                        </li>
                        <li className="lis" id="l1">
                            <a rel="noreferrer" className="links" target={"_blank"} href="https://web.facebook.com/profile.php?id=100066746072037">
                                <FaFacebook id="Facebook" /> Facebook
                            </a>
                        </li>
                        <li className="lis" id="l2">
                            <a rel="noreferrer" className="links" target={"_blank"} href="www.Instagram.com">
                                <FaInstagram id="Instagram" /> Instagram
                            </a>
                        </li>
                        <li className="lis" id="l3">
                            <a rel="noreferrer" className="links" target={"_blank"} href="www.Twitter.com">
                                <FaTwitter id="Twitter" /> Twitter
                            </a>
                        </li>
                        <li className="lis" id="l4">
                            <a rel="noreferrer" className="links" target={"_blank"} href="www.youtube.com">
                                <FaYoutube id="Youtube" /> Youtube
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="ft">
                <hr id="lin" />
                <p id="f2">Copyright &#169; 2022 - ASAD ULLAH</p>
            </div>
        </div>
    );
};

export default Footer;
