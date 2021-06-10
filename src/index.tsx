import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeAbout from "./Components/Pages/Home/HomeAbout/HomeAbout";
const Game = lazy(() => import("./Pages/Game/Game"));
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <Switch>
            <Route path="/" exact>
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
      </Suspense>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
