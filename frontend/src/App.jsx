import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from "./component/Home/Home.jsx";
import webfonts from "webfontloader";
import ProductsWrapper from "./component/ProductsPage/ProductsWrapper";
import Navbar from "./component/Home/Navbar/Navbar";
import DetailsWrapper from "./component/layout/ProductDetails/DetailsWrapper";
import Forms from "./component/RegistrationForm/Forms";
import store from "./store";
import { loadUser } from "./actions/userActions";
import Speeddial from "./component/SpeedDial/Speeddial";
import { useSelector } from "react-redux";
import Profile from "./component/Profile/Profile";
import UpdateProfile from "./component/Profile/UpdateProfile";
import UpdatePassword from "./component/Password/UpdatePassword";
import ForgotPassword from "./component/Password/ForgotPassword";
import ResetPassword from "./component/Password/ResetPassword";
import Cart from "./component/Cart/Cart";

function App() {
  React.useEffect(() => {
    webfonts.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  const { isAuthenticated, loading } = useSelector(state => state.user);

  return (
    <div>
      <BrowserRouter>
        <Speeddial />
        {!loading && <Navbar />}
        <Routes >
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<DetailsWrapper />} />
          <Route exact path="/Products" element={<ProductsWrapper />} />
          <Route exact path="/login" element={<Forms />} />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route exact path="/Profile" element={isAuthenticated ? <Profile /> : <Forms />} />
          <Route exact path="/UpdateProfile" element={isAuthenticated ? <UpdateProfile /> : <Forms />} />
          <Route exact path="/password/update" element={isAuthenticated ? <UpdatePassword /> : <Forms />} />
          <Route exact path="/password/reset/:token" element={<ResetPassword />} />
          <Route exact path="/cart" element={isAuthenticated?<Cart/>:<Home/>} />
        </Routes>
      </BrowserRouter>

      {/* Footer
      <div id='footerdiv' style={{position:"relative"}}>
        <Footer />
      </div> */}
    </div>
  );
}

export default App;
