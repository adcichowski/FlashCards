import { useEffect } from "react";
import { Button } from "../../../Components/Button/Button";
import { useCardContext } from "../../../Context/CardContext";
import { useGameContext } from "../../../Context/GameContext";
import { Card } from "../../../Types/Types";
import { CardByContext } from "../../../Components/Pages/Game/CardByContext/CardByContext";
import { useAvaibleTechnologies } from "../../../Components/Pages/Game/useAvaibleTechnologies";
import styles from "./AddCard.module.scss";
function AddCard() {
  const { state } = useGameContext();
  const { dispatch, state: stateCard } = useCardContext();
  const allDataCards = [...state.generalCards, ...state.personalCards];
  const { avaibleTechnologies } = useAvaibleTechnologies();
  useEffect(() => {
    if (stateCard.isShow === false) dispatch({ type: "showEmptyCard" });
  });
  const handleChangeTechnology = (
    nameTechnology: string,
    partOfCard: keyof Card
  ) => {
    dispatch({
      type: "editingCard",
      setCard: {
        ...stateCard,
        [partOfCard]: nameTechnology,
      },
    });
  };
  const handleChangePartCard = (
    e: React.FormEvent<HTMLInputElement>,
    partOfCard: keyof Card
  ) => {
    const newValue = e.currentTarget.value;
    dispatch({
      type: "editingCard",
      setCard: {
        ...stateCard,
        [partOfCard]: newValue,
      },
    });
  };
  const renderAllIconsTechnologies = Object.values(avaibleTechnologies).map(
    ({ name, render: Component }) => (
      <label className={styles.radioLabel}>
        <input
          className={styles.radioInput}
          onClick={() => handleChangeTechnology(name, "technology")}
          type="radio"
          name="technology"
        ></input>
        <div className={styles.radioIcon}>
          <Component />
        </div>
      </label>
    )
  );

  return (
    <div>
      <p>Added new card to database!</p>
      <div>
        <form>
          <label>
            <p>Technology</p>
            <div className={styles.listRadioTechnology}>
              {renderAllIconsTechnologies}
            </div>
            <p>Answer</p>
            <input onChange={(e) => handleChangePartCard(e, "question")} />
          </label>
          <label>
            <p>Question</p>
            <input
              onChange={(e) => {
                handleChangePartCard(e, "answer");
              }}
            />
          </label>
        </form>
      </div>
      <CardByContext allSortedDataCards={allDataCards} />
      <Button>Add Card</Button>
    </div>
  );
}
export { AddCard };
