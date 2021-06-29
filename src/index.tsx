import React from "react";
import ReactDOM from "react-dom";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeAbout from "./Components/Pages/Home/HomeAbout/HomeAbout";
import Game from "./Pages/Game/Game";
import MainProvider from "./Context/MainContext";
import { GameProvider } from "./Context/GameContext";
import Board from "./Components/Pages/Game/Board/Board";
import Form from "./Pages/Login/Form";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MainProvider>
        <GameProvider>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/about">
              <HomeAbout />
            </Route>
            <Route path="/game">
              <Game>
                <Board />
              </Game>
            </Route>
            <Route path="/login">
              <Game>
                <Form />
              </Game>
            </Route>
          </Switch>
        </GameProvider>
      </MainProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
