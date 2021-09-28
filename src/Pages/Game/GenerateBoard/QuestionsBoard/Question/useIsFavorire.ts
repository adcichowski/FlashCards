import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../../../../Context/AuthContext";
import { useCardContext } from "../../../../../Context/CardContext";
import { sendFunctionsToFirebase } from "../../../../../lib/firebase/Utils";
import { ICard } from "../../../../../Types/Types";

function useIsFavorire(card: ICard) {
  const { state } = useAuthContext();
  const { dispatch, state: stateCard } = useCardContext();
  const { sendDeck } = sendFunctionsToFirebase();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const setFavorite = useCallback(
    (card: ICard) => {
      if (isFavorite) return;
      setIsFavorite(true);
      dispatch({
        type: "editCard",
        setCard: { ...stateCard, isFavorite: true },
      });
      sendDeck(
        {
          ...state.personalCards,
          favorites: [
            ...(state?.personalCards?.favorites?.length
              ? state.personalCards.favorites
              : []),
            card,
          ],
        },
        state.idUser
      );
      dispatch({
        type: "editCard",
        setCard: { ...card, isFlip: false, isFavorite: true },
      });
    },
    [sendDeck, dispatch, state, setIsFavorite, isFavorite, stateCard]
  );

  useEffect(() => {
    const isInFavorite = state?.personalCards?.favorites?.some(
      (personalCard) =>
        card.question === personalCard.question &&
        card.answer === personalCard.answer &&
        card.id === personalCard.id
    );
    if (isInFavorite) setIsFavorite(true);
  }, [card, state.personalCards.favorites]);
  console.log(isFavorite);
  return { isFavorite, setIsFavorite, setFavorite };
}
export { useIsFavorire };
