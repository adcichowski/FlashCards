import React from "react";
import ReactDOM from "react-dom";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeAbout from "./Components/Pages/Home/HomeAbout/HomeAbout";
import Game from "./Pages/Game/Game";
import MainProvider from "./Context/MainContext";
import { GameProvider } from "./Context/GameContext";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MainProvider>
        <div>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/about">
              <HomeAbout />
            </Route>
            <Route path="/game">
              <GameProvider>
                <Game />
              </GameProvider>
            </Route>
            <Route path="/game/board"></Route>
          </Switch>
        </div>
      </MainProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
