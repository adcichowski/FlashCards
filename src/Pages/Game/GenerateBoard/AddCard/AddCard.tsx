import Button from "../../../../Components/Button/Button";
import { useCardContext } from "../../../../Context/CardContext";
import { useGameContext } from "../../../../Context/GameContext";
import CardByContext from "../../Card/CardByContext";

export default function AddCard() {
  const { state } = useGameContext();
  const { dispatch } = useCardContext();
  const allDataCards = [...state.generalCards, ...state.personalCards];
  return (
    <div>
      <p>Added new card to database!</p>
      <CardByContext allSortedDataCards={allDataCards} />
      <Button onClick={() => dispatch({ type: "showEmptyCard" })}>
        Dodaj Karte
      </Button>
    </div>
  );
}
