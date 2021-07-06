import { useGameContext } from "../../../Context/GameContext";
import { Card } from "../../../Types";
import { ReactComponent as Heart } from "../../../Assets/Icons/heart.svg";
import { ReactComponent as Plus } from "../../../Assets/Icons/plus.svg";
import styles from "./Personal.module.scss";
export default function PersonalCards() {
  const {
    state: { personalCards },
  } = useGameContext();
  return (
    <div className={styles.personalBoard}>
      <h3 className={styles.personalTitle}>Personal Cards</h3>
      <div className={styles.personalTechnology}>
        <ul className={styles.listIcons}>
          {personalCards.map((card: Card) => (
            <li key={card.technology}>
              <button
                className={`${styles.icon} ${styles.active}`}
                style={{
                  backgroundImage: `url("/Icons/${card.technology.toLowerCase()}.svg")`,
                }}
              ></button>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.buttons}>
        <div className={styles.outsideButton}>
          Favorite Cards
          <button className={styles.button}>
            <Heart />
          </button>
        </div>
        <div className={styles.outsideButton}>
          Create Card
          <button className={styles.button}>
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
}
