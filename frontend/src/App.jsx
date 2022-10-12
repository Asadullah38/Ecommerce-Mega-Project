import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom"; import Header from "./component/layout/Header/Header.jsx";
import Home from "./component/Home/Home.jsx";
import webfonts from "webfontloader";
import ProductDetails from "./component/layout/ProductDetails/ProductDetails";
import ProductsWrapper from "./component/ProductsPage/ProductsWrapper";
import Navbar from "./component/Home/Navbar/Navbar";


function App() {
  React.useEffect(() => {
    webfonts.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes >
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/Products" element={<ProductsWrapper />} />
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
