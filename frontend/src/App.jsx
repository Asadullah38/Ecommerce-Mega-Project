import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom"; import Header from "./component/layout/Header/Header.jsx";
import Home from "./component/Home/Home.jsx";
import webfonts from "webfontloader";
import ProductsWrapper from "./component/ProductsPage/ProductsWrapper";
import Navbar from "./component/Home/Navbar/Navbar";
import DetailsWrapper from "./component/layout/ProductDetails/DetailsWrapper";
import Forms from "./component/RegistrationForm/Forms";
import store from "./store";
import { loadUser } from "./actions/userActions";
import Speeddial from "./component/SpeedDial/Speeddial";

function App() {

  React.useEffect(() => {
    webfonts.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);


  return (
    <div>
      <BrowserRouter>
        <Speeddial />
        <Navbar />
        <Routes >
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<DetailsWrapper />} />
          <Route exact path="/Products" element={<ProductsWrapper />} />
          <Route exact path="/login" element={<Forms />} />
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
