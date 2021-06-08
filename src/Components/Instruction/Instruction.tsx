import { ReactComponent as FrontCard } from "../../Assets/Pages/Home/CardInstruction/FrontCard.svg";
import { ReactComponent as BackCard } from "../../Assets/Pages/Home/CardInstruction/BackCard.svg";
import Button from "../Button/Button";
import useInstruction from "./Hook";
import styles from "./Instruction.module.scss";

export default function Instruction() {
  const { getElements, isFlip, flipCard } = useInstruction();
  return (
    <section className={styles.introduce}>
      <h2 className={`${styles.introduce__title} underline`}>
        {!isFlip ? "Front Card Side" : "Back Side Card"}
      </h2>
      <div ref={getElements} className={styles.card}>
        {!isFlip ? <FrontCard /> : <BackCard />}
      </div>
      <Button onClickAction={() => flipCard(!isFlip)} text="Flip Card" />
    </section>
  );
}
