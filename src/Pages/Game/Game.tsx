import styles from "./Game.module.scss";
import Form from "../../Components/Pages/Game/Form/Form";
import { auth } from "../../lib/firebase/index";
import Board from "../../Components/Pages/Game/Board/Board";
import Modal from "../../Components/Modal/Modal";
export default function Game() {
  return (
    <>
      <Modal />
      <section className={styles.game}>
        {auth?.currentUser?.uid !== undefined ? <Board /> : <Form />}
      </section>
    </>
  );
}
