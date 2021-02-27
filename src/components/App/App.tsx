import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Stocks from "../Stocks/Stocks";
import AboutUs from "../Aboutus/Aboutus";
import "./App.css";

const App: React.FC = () => {
  return (
    <>
      {/* The router will go here */}

      <Header />
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/stocks">
            <Stocks />
          </Route>
          <Route path="/aboutus">
            <AboutUs />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default App;
