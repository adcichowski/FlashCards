import { Button } from "../../../Components/Button/Button";
import { useCardContext } from "../../../Context/CardContext";
import { ICard } from "../../../Types/Types";
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
    partOfCard: keyof ICard,
    changeTo: string | boolean
  ) => {
    dispatch({
      type: "editCard",
      setCard: {
        ...stateCard,
        [partOfCard]: changeTo,
      },
    });
  };

  const renderRadioButtons = Object.values(avaibleTechnologies).map(
    ({ name, render: Component }) => (
      <label key={name} className={styles.radioLabel}>
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
      <div className={styles.addTech}>
        <h1 className={styles.title}>Create Your Own Card</h1>

        <div className={styles.addTechInside}>
          <div className={styles.addTechTechnologies}>
            <span className={styles.formAddTechTitle}>Set Techology</span>
            <div ref={getElements} className={styles.listRadioTechnology}>
              {renderRadioButtons}
            </div>
          </div>
          <label>
            <p>Question</p>
            <input
              className={styles.textInput}
              onChange={(e) =>
                handleChangePartCard("question", e.currentTarget.value)
              }
            />
          </label>
          <label>
            <p>Answer</p>
            <textarea
              className={`${styles.textInput} ${styles.textarea}`}
              onChange={(e) => {
                handleChangePartCard("answer", e.currentTarget.value);
              }}
            ></textarea>
          </label>

          <div className={styles.inputsDeck}>
            <label className={styles.labelDeck}>
              General Cards
              <input
                className={styles.deckRadioInput}
                type="radio"
                name="board"
                onClick={() => setNameDatabase("generalCards")}
              />
              <div className={styles.deckRadioInputIcon}></div>
            </label>
            <label className={styles.labelDeck}>
              Personal Cards
              <input
                className={styles.deckRadioInput}
                type="radio"
                name="board"
                onClick={() => setNameDatabase("personalCards")}
              />
              <div className={styles.deckRadioInputIcon}></div>
            </label>
          </div>
        </div>
        <span>
          <Button size="normal" type="button" onClick={sendCardToDatabase}>
            Add Card
          </Button>
          <Button
            size="normal"
            type="button"
            onClick={() => dispatch({ type: "showCard" })}
          >
            Show Card
          </Button>
        </span>
      </div>
      <div className={styles.card}>
        <CardByContext isEdit />
      </div>
    </div>
  );
}
export { AddCard };
AddCard.displayName = "AddCard";