import { Navigation } from "../../../Navigation/Navigation";
import styles from "./MainBoard.module.scss";
import { Button } from "../../../Button/Button";
import { useAuthContext } from "../../../../Context/AuthContext";
import { Link } from "react-router-dom";
import { useGetData } from "../../../Hooks/useGetData";
import { ReactComponent as Plus } from "../../../../Assets/Icons/plus.svg";
import { ReactComponent as Heart } from "../../../../Assets/Icons/heart.svg";
import { useCallback } from "react";
function MainBoard() {
  useGetData();
  const { dispatch } = useAuthContext();
  const handleClickLogOut = useCallback(() => {
    dispatch({ type: "logOut" });
  }, [dispatch]);
  return (
    <>
      <Navigation />

      <div className={styles.board}>
        <div className={styles.insideBoard}>
          <Button
            width="calc(13rem + 6vw)"
            height="calc(3rem + 3vw)"
            fontSize="clamp(2rem,calc(1rem + 1vw),6rem)"
            link="game/personal-cards"
          >
            Personal Cards
          </Button>
          <div className={styles.secondButton}>
            <div className={styles.outsideButton}>
              Create Card
              <Link to="/game/personal-cards/add" className={styles.link}>
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

          <Button
            width="calc(13rem + 6vw)"
            height="calc(3rem + 3vw)"
            fontSize="clamp(2rem,calc(1rem + 1vw),6rem)"
            link="game/general-cards"
          >
            General Cards
          </Button>
        </div>

        <Button onClick={handleClickLogOut}>Log Out</Button>
      </div>
    </>
  );
}
export { MainBoard };
