import { useAuthContext } from "../../../Context/AuthContext";
import { useGameContext } from "../../../Context/GameContext";
import { Card } from "../../../Types";
import { useGetData } from "../Hook/useGetData";
import styles from "./Personal.module.scss";
export default function PersonalCards() {
  const { state } = useAuthContext();
  useGetData(state.idUser);
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
        <button>Favorite Card</button>
        <button>Create Card</button>
      </div>
    </div>
  );
}
