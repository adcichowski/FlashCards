import React from "react";
import ReactDOM from "react-dom";
import Home from "./Pages/Home/Home.js";
import styles from "./index.module.scss";

ReactDOM.render(
  <React.StrictMode>
    <div className={styles.wrapper}>
      <Home />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
