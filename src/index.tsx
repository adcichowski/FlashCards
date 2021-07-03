import React from "react";
import ReactDOM from "react-dom";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./Pages/Game/Game";
import MainProvider from "./Context/MainContext";
import { AuthProvider } from "./Context/AuthContext";
import Board from "./Components/Pages/Game/Board/Board";
import Form from "./Pages/Login/Form";
import PersonalCards from "./Pages/Game/PersonalCards/PersonalCards";
import GeneralCards from "./Pages/Game/GeneralCards/GeneralCards";
import PrivateRoute from "./Routes/PrivateRoute";
import Modal from "./Components/Modal/Modal";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MainProvider>
        <AuthProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Form} />
            <Game>
              <PrivateRoute path="/game" exact component={Board} />
              <PrivateRoute
                path="/game/personal-cards"
                exact
                component={PersonalCards}
              />

              <Route exact path="/game/general-cards">
                <GeneralCards />
              </Route>
            </Game>
          </Switch>
          <Modal />
        </AuthProvider>
      </MainProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
