import React from "react";
import ReactDOM from "react-dom";
import Home from "./Pages/Home/Home.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeAbout from "./Components/Pages/Home/HomeAbout/HomeAbout.js";
import Game from "./Pages/Game/Game.js";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/about">
            <HomeAbout />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
