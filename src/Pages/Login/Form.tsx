import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import styles from "./Login.module.scss";
import Modal from "../../Components/Modal/Modal";
export default function Form() {
  const [isRegister, setRegister] = useState(true);
  const handleClickRegister = () => setRegister(!isRegister);

  return (
    <div className={styles.game}>
      {isRegister ? (
        <Login handleClickRegister={handleClickRegister} />
      ) : (
        <Register handleClickRegister={handleClickRegister} />
      )}
      <Modal />
    </div>
  );
}
