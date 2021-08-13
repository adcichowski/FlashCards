import { Navigation } from "../../../Navigation/Navigation";
import styles from "./MainBoard.module.scss";
import { Button } from "../../../Button/Button";
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
          <Button link="game/personal-cards">Personal Cards</Button>
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
                <Link
                  to="/game/personal-cards/favorite"
                  className={styles.link}
                >
                  <Heart />
                </Link>
              </div>
            </div>
          </div>

          <Button link="game/general-cards">General Cards</Button>
        </div>
      </div>
    </>
  );
}
export { MainBoard };
