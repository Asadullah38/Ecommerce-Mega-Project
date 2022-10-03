import "./App.css";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"; import Header from "./component/layout/header/Header.jsx";
import Home from "./component/Home/Home.jsx";
import webfonts from "webfontloader";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
