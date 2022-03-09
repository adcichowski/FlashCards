import { useAnimationGSAP } from "client/src/Components/Hooks/useAnimationGSAP";
import { useAvaibleTechnologies } from "client/src/Components/Pages/Game/useAvaibleTechnologies";
import { useCardContext } from "client/src/Context/CardContext";
import { AnimateIconTech } from "client/src/lib/gsap/AnimateIconTech";
import { useSendCardToDatabase } from "client/src/Pages/Game/AddCard/useSendCardToDatabase";
import { useSetIdCard } from "client/src/Pages/Game/AddCard/useSetIdCard";
import { ICard } from "client/src/Types/Types";
import styles from "client/src/Pages/Game/AddCard/AddCard.module.scss";
import { BackButton } from "client/src/Components/Button/BackButton/BackButton";
import { Button } from "client/src/Components/Button/Button";
import { CardByContext } from "client/src/Components/Pages/Game/CardByContext/CardByContext";
import { Game } from "client/src/Pages/Game/Game";
export default function AddCard() {
  const { nameDatabase, setNameDatabase } = useSetIdCard();
  const { sendCardToDatabase } = useSendCardToDatabase(nameDatabase);
  const { dispatch, state: stateCard } = useCardContext();
  const { avaibleTechnologies } = useAvaibleTechnologies();
  const { getElements } = useAnimationGSAP(AnimateIconTech);
  const handleChangePartCard = (partOfCard: keyof ICard, changeTo: string | boolean) => {
    dispatch({
      type: "editCard",
      setCard: {
        ...stateCard,
        [partOfCard]: changeTo,
      },
    });
  };

  const renderRadioButtons = Object.values(avaibleTechnologies).map(({ name, render: Component }) => (
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
  ));

  return (
    <Game>
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
                onChange={(e) => handleChangePartCard("question", e.currentTarget.value)}
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
            <Button size="normal" type="button" onClick={() => dispatch({ type: "showCard" })}>
              Show Card
            </Button>
          </span>
        </div>
        <div className={styles.card}>
          <CardByContext isEdit />
        </div>
      </div>
    </Game>
  );
}
AddCard.displayName = "AddCard";
