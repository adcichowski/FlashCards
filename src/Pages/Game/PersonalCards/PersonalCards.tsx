import { useGameContext } from "../../../Context/GameContext";
import { Card } from "../../../Types";
import styles from "./Personal.module.scss";
export default function PersonalCards() {
  const {
    state: { personalCards },
  } = useGameContext();
  return (
    <div className={styles.personalBoard}>
      <h3 className={styles.personalTitle}>Personal Cards</h3>
      <div className={styles.personalTechnology}>
        {personalCards.map((card: Card) => (
          <button
            className={styles.iconTechnology}
            key={card.technology}
            style={{
              backgroundImage: `url("/Icons/${card.technology.toLowerCase()}.svg")`,
            }}
          ></button>
        ))}
      </div>
      <div>
        <button className={styles.favoriteButton}>Favorite Card</button>
        <button className={styles.createButton}>Create Card</button>
      </div>
    </div>
  );
}
