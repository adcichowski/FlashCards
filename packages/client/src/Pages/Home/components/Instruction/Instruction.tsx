import FrontCard from "./FrontCardR";
import BackCard from "./BackCardR";

import { useInstruction } from "./useInstruction";
import styles from "./Instruction.module.scss";
import { useCallback } from "react";
import { Button } from "src/components/Button/Button";
function Instruction() {
  const { getElements, isFlip, flipCard } = useInstruction();
  const handleClickFlip = useCallback(() => flipCard(!isFlip), [flipCard, isFlip]);
  return (
    <section className={styles.introduce}>
      <h2 className={`${styles.introduceTitle}`}>{!isFlip ? "Front Card Side" : "Back Side Card"}</h2>
      <div ref={getElements} className={styles.card}>
        {!isFlip ? <FrontCard /> : <BackCard />}
      </div>
      <Button size="normal" type="button" onClick={handleClickFlip}>
        Flip Card
      </Button>
    </section>
  );
}
export { Instruction };
Instruction.displayName = "Instruction";
