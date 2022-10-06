import "./App.css";
import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"; import Header from "./component/layout/header/Header.jsx";
import Home from "./component/Home/Home.jsx";
import webfonts from "webfontloader";
import Loader from "./component/layout/Loader/Loader";

function App() {

  const { loading } = useSelector(state => state.products);

  React.useEffect(() => {
    webfonts.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <div>
      <Header/>
      <BrowserRouter>
        <Routes >
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
