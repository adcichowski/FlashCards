import styles from "./GenerateBoard.module.scss";
import { Card } from "../../../Types/Types";
import { BackButton } from "../../../Components/Button/BackButton/BackButton";
import { GenerateIconsTechnologies } from "../../../Components/Pages/Game/GenerateIconsTechnologies/GenerateIconsTechnologies";
function GenerateBoard({
  cardsData,
  title,
}: {
  cardsData: Card[];
  title: string;
}) {
  return (
    <>
      <BackButton />
      <div className={styles.board}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.technology}>
          <GenerateIconsTechnologies arrayCardsData={cardsData} />
        </div>
      </div>
    </>
  );
}
export { GenerateBoard };
