import { ReactComponent as Heart } from "../../../Assets/Icons/heart.svg";
import { ReactComponent as Plus } from "../../../Assets/Icons/plus.svg";
import styles from "./GenerateBoard.module.scss";
import IconTech from "../../../Components/Pages/Game/IconsTech/IconTech";
import { Link } from "react-router-dom";
import { Card } from "../../../Types";
export default function GenerateBoard({
  cardsFromData,
  title,
}: {
  cardsFromData: Card[];
  title: string;
}) {
  return (
    <>
      <div className={styles.board}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.technology}>
          <IconTech arrayCardData={cardsFromData} />
        </div>
        <div className={styles.buttons}>
          <div className={styles.outsideButton}>
            Favorite Cards
            <Link to="/game/personal-cards/favorite" className={styles.link}>
              <Heart />
            </Link>
          </div>
          <div className={styles.outsideButton}>
            Create Card
            <Link to="/game/personal-cards/add" className={styles.link}>
              <Plus />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
