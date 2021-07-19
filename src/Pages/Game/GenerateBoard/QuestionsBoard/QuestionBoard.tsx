import { useCardContext } from "../../../../Context/CardContext";
import { Card } from "../../../../Types";
import CardComponent from "../../Card/CardByContext";
import BlooperSVG from "./BlooperSVG/BlooperSVG";
import styles from "./QuestionBoard.module.scss";
export default function QuestionBoard({
  blooperColors,
  cardsData,
  technologyBoardName,
}: {
  blooperColors: string;
  cardsData: Card[];
  technologyBoardName: string;
}) {
  const { dispatch } = useCardContext();
  const handleClickShowCard = (card: Card) => {
    dispatch({
      type: "showCard",
      setCard: { ...card, isFlip: false },
    });
  };
  return (
    <>
      <BlooperSVG fill={blooperColors} />
      <div className={styles.board}>
        <h1 className={styles.someFeature}>Some Feature</h1>
        <div className={styles.cardBoard}>
          <CardComponent />
        </div>
        <div className={styles.questionBoard}>
          <p className={styles.questionTitle}>Questions</p>
          <ul className={styles.listQuestion}>
            {cardsData.map((card: Card, id) =>
              card.technology === technologyBoardName ? (
                <li key={id} className={styles.questionCard}>
                  {console.log(card)}
                  <div
                    onClick={() => {
                      handleClickShowCard(card);
                    }}
                    className={styles.questionCardInner}
                  >
                    <button className={styles.questionDots}></button>
                    <p className={styles.question}>{card.question}</p>
                    <div className={styles.questionId}>00{id}</div>
                  </div>
                </li>
              ) : undefined
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
