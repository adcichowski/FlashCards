import styles from "./Game.module.scss";
import Form from "../../Components/Pages/Game/Form/Form";
import { auth } from "../../lib/firebase/index";
import Board from "../../Components/Pages/Game/Board/Board";
import Modal from "../../Components/Modal/Modal";
import { useGameContext } from "../../Context/GameContext";
export default function Game() {
  auth.signOut();
  const { isLogin } = useGameContext();
  return (
    <>
      <Modal />
      <section className={styles.game}>
        {isLogin ? <Board /> : <Form />}
      </section>
    </>
  );
}
