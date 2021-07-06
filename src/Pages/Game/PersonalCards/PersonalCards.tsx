import { ReactComponent as Heart } from "../../../Assets/Icons/heart.svg";
import { ReactComponent as Plus } from "../../../Assets/Icons/plus.svg";
import styles from "./Personal.module.scss";
// import IconTech from "../../../Components/Pages/Game/IconsTech/IconsTech";
export default function PersonalCards() {
  return (
    <div className={styles.personalBoard}>
      <h3 className={styles.personalTitle}>Personal Cards</h3>
      <div className={styles.personalTechnology}>
        <ul className={styles.listIcons}>
          {/* <IconTech /> */}
          {/* Working on add some function to render this elements. (Maybe refactor to be better clearly and readable ) */}
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
