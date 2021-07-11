import React from "react";
import ReactDOM from "react-dom";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainProvider from "./Context/MainContext";
import { AuthProvider } from "./Context/AuthContext";
import Form from "./Pages/Login/Form";
import Modal from "./Components/Modal/Modal";
import GameRoute from "./Routes/GameRoute";
import { GameProvider } from "./Context/GameContext";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MainProvider>
        <AuthProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Form} />
            <GameProvider>
              <GameRoute />
            </GameProvider>
          </Switch>
          <Modal />
        </AuthProvider>
      </MainProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
