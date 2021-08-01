import { useEffect } from "react";
import { Button } from "../../../Components/Button/Button";
import { useCardContext } from "../../../Context/CardContext";
import { useGameContext } from "../../../Context/GameContext";
import { Card } from "../../../Types/Types";
import { CardByContext } from "../../../Components/Pages/Game/CardByContext/CardByContext";
import { useAvaibleTechnologies } from "../../../Components/Pages/Game/useAvaibleTechnologies";
import styles from "./AddCard.module.scss";
import { useAnimationGSAP } from "../../../Components/Hooks/useAnimationGSAP";
import { AnimateIconTech } from "../../../lib/gsap/AnimateIconTech";
import { sendData } from "../../../lib/firebase/Utils";
function AddCard() {
  const { state } = useGameContext();
  const { dispatch, state: stateCard } = useCardContext();
  const allDataCards = [...state.generalCards, ...state.personalCards];
  const { avaibleTechnologies } = useAvaibleTechnologies();
  const { getElements } = useAnimationGSAP(AnimateIconTech);
  useEffect(() => {
    if (stateCard.isShow === false) dispatch({ type: "showEmptyCard" });
  });
  const {
    state: { isFavorite, technology, rating, id, answer, question },
  } = useCardContext();
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
  const sendCardToData = () => {
    const card: Card = { isFavorite, technology, rating, id, answer, question };
    sendData("GeneralCards", card);
  };
  const renderRadioButtons = Object.values(avaibleTechnologies).map(
    ({ name, render: Component }) => (
      <label className={styles.radioLabel}>
        <span className="sr-only">{name}</span>
        <input
          className={styles.radioInput}
          onClick={() => {
            handleChangePartCard("technology", name);
            console.log(name);
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
      <div>
        <p>Added new card to database!</p>

        <div className={styles.formAddTechInside}>
          Technology
          <div ref={getElements} className={styles.listRadioTechnology}>
            {renderRadioButtons}
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
            <input
              className={styles.textInput}
              onChange={(e) => {
                handleChangePartCard("answer", e.currentTarget.value);
              }}
            />
          </label>
          <label>
            <input
              type="checkbox"
              onClick={() =>
                handleChangePartCard("isFavorite", !stateCard.isFavorite)
              }
              value="Favorite Card"
            />
            Click if card must be your favorite
          </label>
        </div>
        <Button onClick={sendCardToData}>Add Card</Button>
      </div>
      <CardByContext allSortedDataCards={allDataCards} />
    </div>
  );
}
export { AddCard };
