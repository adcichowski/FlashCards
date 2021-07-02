import React from "react";
import ReactDOM from "react-dom";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./Pages/Game/Game";
import MainProvider from "./Context/MainContext";
import { AuthProvider } from "./Context/AuthContext";
import Board from "./Components/Pages/Game/Board/Board";
import Form from "./Pages/Login/Form";
import Personal from "./Components/Pages/Game/Board/Personal/Personal";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MainProvider>
        <AuthProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Game>
              <Route exact path="/game">
                <Board />
              </Route>
              <Route path="/game/personal-cards">
                <Personal />
              </Route>
              <Route path="/game/general-cards">
                <Personal />
              </Route>
              <Route exact path="/login">
                <Form />
              </Route>
            </Game>
          </Switch>
        </AuthProvider>
      </MainProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
