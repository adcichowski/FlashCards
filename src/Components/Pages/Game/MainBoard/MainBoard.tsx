import { Navigation } from "../../../Navigation/Navigation";
import styles from "./MainBoard.module.scss";
import { BigButton } from "../../../Button/BigButton";
import { Link } from "react-router-dom";
import { ReactComponent as Plus } from "../../../../Assets/Icons/plus.svg";

function MainBoard() {
  return (
    <>
      <Navigation />
      <div className={styles.board}>
        <div className={styles.insideBoard}>
          <div className={styles.boardTitle}>
            <h1>Choose Deck To Seeing Cards</h1>
          </div>

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
        </div>
      </div>
    </>
  );
}
export { MainBoard };
MainBoard.displayName = "MainBoard";
