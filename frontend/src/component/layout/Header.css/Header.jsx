import React from "react";
import { ReactNavbar } from "overlay-navbar";
import { BrowserRouter as Router } from "react-router-dom";
import logo from "../../../images/logo.png";
import "./Header.css";
import { MdAccountCircle,MdSearch,MdAddShoppingCart } from "react-icons/md";

const options = {
  profileIcon: true,
  profileIconColor: "rgba(35, 35, 35,0.8)",
  ProfileIconElement: MdAccountCircle,
  searchIcon: true,
  searchIconColor: "rgba(35, 35, 35,0.8)",
  SearchIconElement: MdSearch,
  cartIcon: true,
  cartIconColor: "rgba(35, 35, 35,0.8)",
  CartIconElement: MdAddShoppingCart,
  burgerColorHover: "#eb4034",
  logo,
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#0ff",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "center",
  nav2justifyContent: "center",
  nav3justifyContent: "center",
  nav4justifyContent: "center",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  logoTransition: 0.3,
  logoAnimationTime: 0.5,
  link1AnimationTime: 0.1,
  link2AnimationTime: 0.3,
  link3AnimationTime: 0.5,
  link4AnimationTime: 0.7,
  link1Transition: 0.2,
  profileIconUrl: "/login",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
  logoWidth: "20vh",
  logoHeight: "5vh",
};

const Header = () => {
  return (
    <div>
      <Router>
        <ReactNavbar {...options} />
      </Router>
    </div>
  );
};

export default Header;
