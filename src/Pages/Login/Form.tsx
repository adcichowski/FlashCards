import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import styles from "./Login.module.scss";
export default function Form() {
  const [isRegister, setRegister] = useState(true);
  const handleClickRegister = () => setRegister(!isRegister);

  return (
    <div className={styles.game}>
      {isRegister ? (
        <Login handleClickRegister={handleClickRegister} />
      ) : (
        <Register />
      )}
    </div>
  );
}
