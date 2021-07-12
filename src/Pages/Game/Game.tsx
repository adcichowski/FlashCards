import styles from "./Game.module.scss";
import Modal from "../../Components/Modal/Modal";

export default function Game({
  children,
}: {
  children: React.PropsWithChildren<{}>;
}) {
  return (
    <>
      <Modal />
      <section className={styles.game}>{children}</section>
    </>
  );
}
