import { Navigation } from "../../../Navigation/Navigation";
import styles from "./MainBoard.module.scss";
import { Link } from "react-router-dom";
import Plus from "../../../../Assets/Icons/plus.svg";
import { Button } from "../../../Button/Button";

function MainBoard() {
  return (
    <>
      <Navigation />
      <div className={styles.board}>
        <div className={styles.insideBoard}>
          <div className={styles.boardTitle}>
            <h1>Choose Deck To Seeing Cards</h1>
          </div>

          <Button size="big" type={{ element: "a", href: "game/personal-cards" }}>
            Personal Cards
          </Button>
          <Button size="big" type={{ element: "a", href: "game/general-cards" }}>
            General Cards
          </Button>

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
