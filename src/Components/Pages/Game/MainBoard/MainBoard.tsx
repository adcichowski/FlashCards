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
      <Navigation />
      <div className={styles.board}>
        <div className={styles.insideBoard}>
          <BigButton type="a" link="game/personal-cards">
            Personal Cards
          </BigButton>
          <BigButton type="a" link="game/general-cards">
            General Cards
          </BigButton>

          <div className={styles.outsideButton}>
            Create Card
            <Link to="/game/add" className={styles.link}>
              <Plus />
            </Link>
          </div>

          <div className={styles.outsideButton}>
            Favorite Cards
            <Link
              to="/game/personal-cards/favorite"
              className={`${styles.link} ${styles.heart}`}
            >
              <Heart />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export { MainBoard };
MainBoard.displayName = "MainBoard";
