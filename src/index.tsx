import React from "react";
import ReactDOM from "react-dom";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ModalProvider } from "./Context/ModalContext";
import { AuthProvider } from "./Context/AuthContext";
import { Form } from "./Pages/Login/Form";
import { Modal } from "./Components/Modal/Modal";
import { GameRoute } from "./Routes/GameRoute";
import styles from "./index.module.scss";
import { CardProvider } from "./Context/CardContext";
import { Contact } from "./Pages/Contact/Contact";
ReactDOM.render(
  <React.StrictMode>
    <div className={styles.cotainer}>
      <Router>
        <ModalProvider>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Form} />
              <Route path="/contact" component={Contact} />
              <CardProvider>
                <GameRoute />
              </CardProvider>
            </Switch>
            <Modal />
          </AuthProvider>
        </ModalProvider>
      </Router>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
