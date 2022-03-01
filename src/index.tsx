import React from "react";
import ReactDOM from "react-dom";
import Home from "../pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ModalProvider } from "./Context/ModalContext";
import { AuthProvider } from "./Context/AuthContext";
import { Form } from "./Pages/Login/Form";
import { Modal } from "./Components/Modal/Modal";
import { GameRoute } from "./Routes/GameRoute";
import { CardProvider } from "./Context/CardContext";
import { Contact } from "./Pages/Contact/Contact";
import dotenv from "dotenv";
dotenv.config();
ReactDOM.render(
  <React.StrictMode>
    <div>
      <Router>
        <ModalProvider>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/register">
                <Form type="register" />
              </Route>
              <Route path="/login">
                <Form type="login" />
              </Route>
              <Route path="/contact" component={Contact} />
              <CardProvider>
                <GameRoute />
                <Modal />
              </CardProvider>
            </Switch>
          </AuthProvider>
        </ModalProvider>
      </Router>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
