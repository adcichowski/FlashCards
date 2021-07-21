import styles from "./GenerateBoard.module.scss";
import IconTech from "../../../Components/Pages/Game/IconsTech/IconTech";
import { Card } from "../../../Types";
import BackButton from "../../../Components/Button/BackButton/BackButton";
export default function GenerateBoard({
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
          <IconTech arrayCardData={cardsData} />
        </div>
      </div>
    </>
  );
}
