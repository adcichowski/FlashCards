import { ReactComponent as FrontCard } from "../../../../Assets/Pages/Home/CardInstruction/FrontCardR.svg";
import { ReactComponent as BackCard } from "../../../../Assets/Pages/Home/CardInstruction/BackCardR.svg";
import Button from "../../../Button/Button";
import useInstruction from "./Hook";
import styles from "./Instruction.module.scss";

export default function Instruction() {
  const { getElements, isFlip, flipCard } = useInstruction();
  return (
    <section className={styles.introduce}>
      <h2 className={`${styles.introduce__title}`}>
        {!isFlip ? "Front Card Side" : "Back Side Card"}
      </h2>
      <div ref={getElements} className={styles.card}>
        {!isFlip ? <FrontCard /> : <BackCard />}
      </div>
      <Button onClick={() => flipCard(!isFlip)}>Flip Card</Button>
    </section>
  );
}
