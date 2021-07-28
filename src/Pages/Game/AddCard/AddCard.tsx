import { useEffect } from "react";
import Button from "../../../Components/Button/Button";
import { useCardContext } from "../../../Context/CardContext";
import { useGameContext } from "../../../Context/GameContext";
import { Card } from "../../../Types";
import CardByContext from "../Card/CardByContext";

export default function AddCard() {
  const { state } = useGameContext();
  const { dispatch, state: stateCard } = useCardContext();
  const allDataCards = [...state.generalCards, ...state.personalCards];
  useEffect(() => {
    if (stateCard.isShow === false) dispatch({ type: "showEmptyCard" });
  });
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
  return (
    <div>
      <p>Added new card to database!</p>
      <div>
        <form>
          <label>
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
