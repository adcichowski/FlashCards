import { Button } from "../../../Components/Button/Button";
import { useCardContext } from "../../../Context/CardContext";
import { Card } from "../../../Types/Types";
import { useAvaibleTechnologies } from "../../../Components/Pages/Game/useAvaibleTechnologies";
import styles from "./AddCard.module.scss";
import { useAnimationGSAP } from "../../../Components/Hooks/useAnimationGSAP";
import { AnimateIconTech } from "../../../lib/gsap/AnimateIconTech";
import { CardByContext } from "../../../Components/Pages/Game/CardByContext/CardByContext";

import { BackButton } from "../../../Components/Button/BackButton/BackButton";
import { useSendCardToDatabase } from "./useSendCardToDatabase";
import { useSetIdCard } from "./useSetIdCard";
function AddCard() {
  const { nameDatabase, setNameDatabase } = useSetIdCard();
  const { sendCardToDatabase } = useSendCardToDatabase(nameDatabase);
  const { dispatch, state: stateCard } = useCardContext();
  const { avaibleTechnologies } = useAvaibleTechnologies();
  const { getElements } = useAnimationGSAP(AnimateIconTech);
  const handleChangePartCard = (
    partOfCard: keyof Card,
    changeTo: string | boolean
  ) => {
    dispatch({
      type: "editingCard",
      setCard: {
        ...stateCard,
        [partOfCard]: changeTo,
      },
    });
  };

  const renderRadioButtons = Object.values(avaibleTechnologies).map(
    ({ name, render: Component }) => (
      <label className={styles.radioLabel}>
        <span className="sr-only">{name}</span>
        <input
          className={styles.radioInput}
          onClick={() => {
            handleChangePartCard("technology", name);
          }}
          type="radio"
          name="technology"
        />

        <div className={styles.radioIcon}>
          <Component />
        </div>
      </label>
    )
  );

  return (
    <div className={styles.board}>
      <BackButton />
      <div>
        <p className={styles.title}>Save your own card!</p>

        <div className={styles.formAddTechInside}>
          <span className={styles.formAddTechTitle}>Set Techology</span>
          <div ref={getElements} className={styles.listRadioTechnology}>
            {renderRadioButtons}
          </div>
          <label>
            <span className="sr-only">Question</span>
            <input
              placeholder={"Question"}
              className={styles.textInput}
              onChange={(e) =>
                handleChangePartCard("question", e.currentTarget.value)
              }
            />
          </label>
          <label>
            <span className="sr-only">Answer</span>
            <textarea
              placeholder={"Answer"}
              className={`${styles.textInput} ${styles.textarea}`}
              onChange={(e) => {
                handleChangePartCard("answer", e.currentTarget.value);
              }}
            ></textarea>
          </label>
          <label>
            <input
              type="checkbox"
              onClick={() =>
                handleChangePartCard("isFavorite", !stateCard.isFavorite)
              }
              value="Favorite Card"
            />
            Favorite Card
          </label>
          <div className={styles.radioBoard}>
            <label className={styles.labelBoard}>
              General Cards
              <input
                type="radio"
                name="board"
                onClick={() => setNameDatabase("generalCards")}
              />
            </label>
            <label className={styles.labelBoard}>
              Personal Cards
              <input
                type="radio"
                name="board"
                onClick={() => setNameDatabase("personalCards")}
              />
            </label>
          </div>
        </div>
        <Button
          type="button"
          onClick={() => {
            sendCardToDatabase();
          }}
        >
          Add Card
        </Button>
      </div>
      <div className={styles.card}>
        <CardByContext />
      </div>
    </div>
  );
}
export { AddCard };
