import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MainProvider } from "./Context/MainContext";
import { AuthProvider } from "./Context/AuthContext";
import { Form } from "./Pages/Login/Form";
import { Modal } from "./Components/Modal/Modal";
import { GameProvider } from "./Context/GameContext";
import styles from "./index.module.scss";
const GameRoute = React.lazy(() =>
  import("./Routes/GameRoute").then((module) => ({ default: module.GameRoute }))
);
ReactDOM.render(
  <React.StrictMode>
    <div className={styles.cotainer}>
      <Router>
        <MainProvider>
          <AuthProvider>
            <Switch>
              <Route path="/" exact component={Home} />

              <Route path="/login" component={Form} />
              <Suspense fallback={<div>Generate Game Section</div>}>
                <GameProvider>
                  <GameRoute />
                </GameProvider>
              </Suspense>
            </Switch>
            <Modal />
          </AuthProvider>
        </MainProvider>
      </Router>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
