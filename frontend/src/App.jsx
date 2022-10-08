import "./App.css";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, } from "react-router-dom"; import Header from "./component/layout/Header.css/Header.jsx";
import Home from "./component/Home/Home.jsx";
import webfonts from "webfontloader";
import ProductDetails from "./component/layout/ProductDetails/ProductDetails";

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
      <Header />
      <BrowserRouter>
        <Routes >
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
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
