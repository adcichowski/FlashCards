import { useCardContext } from "src/context/CardContext";
import { useAnimationGSAP } from "src/hooks/useAnimationGSAP";
import { AnimateIconTech } from "src/lib/gsap/AnimateIconTech";
import { ICard } from "src/types/types";
import styles from "AddCard.module.scss";
import { BackButton } from "src/components/Button/BackButton/BackButton";
import { Button } from "src/Components/Button/Button";
function AddCard() {
  const { dispatch, state: stateCard } = useCardContext();
  // const { avaibleTechnologies } = useAvaibleTechnologies();
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

  // const renderRadioButtons = Object.values(avaibleTechnologies).map(({ name, render: Component }) => (
  //   <label key={name} className={styles.radioLabel}>
  //     <span className="sr-only">{name}</span>
  //     <input
  //       className={styles.radioInput}
  //       onClick={() => {
  //         handleChangePartCard("technology", name);
  //       }}
  //       type="radio"
  //       name="technology"
  //     />

  //     <div className={styles.radioIcon}>
  //       <Component />
  //     </div>
  //   </label>
  // ));

  return (
    <div className={styles.board}>
      <BackButton />
      <div className={styles.addTech}>
        <h1 className={styles.title}>Create Your Own Card</h1>

        <div className={styles.addTechInside}>
          <div className={styles.addTechTechnologies}>
            <span className={styles.formAddTechTitle}>Set Techology</span>
            <div ref={getElements} className={styles.listRadioTechnology}></div>
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
              <input className={styles.deckRadioInput} type="radio" name="board" />
              <div className={styles.deckRadioInputIcon}></div>
            </label>
            <label className={styles.labelDeck}>
              Personal Cards
              <input className={styles.deckRadioInput} type="radio" name="board" />
              <div className={styles.deckRadioInputIcon}></div>
            </label>
          </div>
        </div>
        <span>
          <Button size="normal" type="button">
            Add Card
          </Button>
          <Button size="normal" type="button" onClick={() => dispatch({ type: "showCard" })}>
            Show Card
          </Button>
        </span>
      </div>
      <div className={styles.card}>{/* <CardByContext isEdit /> */}</div>
    </div>
  );
}
export { AddCard };
AddCard.displayName = "AddCard";
