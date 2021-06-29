import styles from "./Game.module.scss";
import Modal from "../../Components/Modal/Modal";
import { ReactChild } from "react";
export default function Game({ children }: { children: ReactChild }) {
  return (
    <>
      <Modal />
      <section className={styles.game}>{children}</section>
    </>
  );
}
