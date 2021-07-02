import styles from "./Game.module.scss";
import Modal from "../../Components/Modal/Modal";
import { ReactChild } from "react";
import { GameProvider } from "../../Context/GameContext";
export default function Game({ children }: { children: ReactChild[] }) {
  return (
    <GameProvider>
      <Modal />
      <section className={styles.game}>{children}</section>
    </GameProvider>
  );
}
