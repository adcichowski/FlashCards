import { Navigation } from "../../../Navigation/Navigation";
import styles from "./MainBoard.module.scss";
import { BigButton } from "../../../Button/BigButton";
import { Link } from "react-router-dom";
import { useGetData } from "../../../Hooks/useGetData";
import { ReactComponent as Plus } from "../../../../Assets/Icons/plus.svg";
import { ReactComponent as Heart } from "../../../../Assets/Icons/heart.svg";

function MainBoard() {
  useGetData();
  return (
    <>
      <div className={styles.navigation}>
        <Navigation />
      </div>

      <div className={styles.insideBoard}>
        <BigButton link="game/personal-cards">Personal Cards</BigButton>
        <div className={styles.secondButton}>
          <div className={styles.outsideButton}>
            Create Card
            <Link to="/game/add" className={styles.link}>
              <Plus />
            </Link>
          </div>
          <div className={styles.buttons}>
            <div className={styles.outsideButton}>
              Favorite Cards
              <Link to="/game/personal-cards/favorite" className={styles.link}>
                <Heart />
              </Link>
            </div>
          </div>
        </div>

        <BigButton link="game/general-cards">General Cards</BigButton>
      </div>
    </>
  );
}
export { MainBoard };
