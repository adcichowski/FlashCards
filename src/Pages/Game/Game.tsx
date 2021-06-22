import styles from "./Game.module.scss";
import Form from "../../Components/Pages/Game/Form/Form";
export default function Game() {
  return (
    <section className={styles.game}>
      <Form />
    </section>
  );
}
