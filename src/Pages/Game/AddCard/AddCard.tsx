import { Button } from "../../../Components/Button/Button";
import { useCardContext } from "../../../Context/CardContext";
import { Card } from "../../../Types/Types";
import { useAvaibleTechnologies } from "../../../Components/Pages/Game/useAvaibleTechnologies";
import styles from "./AddCard.module.scss";
import { useAnimationGSAP } from "../../../Components/Hooks/useAnimationGSAP";
import { AnimateIconTech } from "../../../lib/gsap/AnimateIconTech";
import { sendData } from "../../../lib/firebase/Utils";
import { CardByContext } from "../../../Components/Pages/Game/CardByContext/CardByContext";
import { useEffect, useState } from "react";
import { useGameContext } from "../../../Context/GameContext";
import { useAuthContext } from "../../../Context/AuthContext";
import { useGetData } from "../../../Components/Hooks/useGetData";
import { useMainContext } from "../../../Context/MainContext";
import { useHistory } from "react-router";
import { BackButton } from "../../../Components/Button/BackButton/BackButton";
function AddCard() {
  useGetData();
  const [nameDataBases, setNameDataBases] = useState<
    "personalCards" | "generalCards" | ""
  >("");
  const history = useHistory();
  const { dispatch, state: stateCard } = useCardContext();
  const { avaibleTechnologies } = useAvaibleTechnologies();
  const { dispatch: dispatchModal } = useMainContext();
  const { getElements } = useAnimationGSAP(AnimateIconTech);
  const { state: authState } = useAuthContext();
  const { state } = useGameContext();
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
  useEffect(() => {
    if (!stateCard.isShow) dispatch({ type: "showEmptyCard" });
    if (stateCard.technology === "none" || !nameDataBases) return;
    const newValueId = !!state[nameDataBases][stateCard.technology]
      ? state[nameDataBases][stateCard.technology].slice(-1)[0].id + 1
      : 1;
    if (stateCard.id !== newValueId) {
      dispatch({ type: "setId", setCard: { ...stateCard, id: newValueId } });
    }
  }, [dispatch, stateCard, state, nameDataBases]);
  const {
    state: { isFavorite, technology, rating, id, answer, question },
  } = useCardContext();
  const sendCardToData = (placeToSaveCard: string) => {
    const card: Card = {
      isFavorite,
      technology,
      rating,
      id,
      answer,
      question,
    };
    if (placeToSaveCard === "personalCards") sendData(authState.idUser, card);
    if (placeToSaveCard === "generalCards") sendData("GeneralCards", card);
    dispatchModal({
      type: "successModal",
      setModal: { message: `Card Saved` },
    });
    history.push("/game");
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
                onClick={() => setNameDataBases("generalCards")}
              />
            </label>
            <label className={styles.labelBoard}>
              Personal Cards
              <input
                type="radio"
                name="board"
                onClick={() => setNameDataBases("personalCards")}
              />
            </label>
          </div>
          <Button onClick={() => sendCardToData(nameDataBases)}>
            Add Card
          </Button>
        </div>
      </div>
      <div className={styles.card}>
        <CardByContext />
      </div>
    </div>
  );
}
export { AddCard };
