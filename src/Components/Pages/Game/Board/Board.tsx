import Navigation from "../../../Navigation/Navigation";
import styles from "./Board.module.scss";
import Button from "../../../Button/Button";
import { useAuthContext } from "../../../../Context/AuthContext";
import { Link } from "react-router-dom";
import { useGetData } from "../../../../Pages/Game/Hook/useGetData";

export default function Board() {
  useGetData();
  const { dispatch } = useAuthContext();
  const handleClickLogOut = () => {
    dispatch({ type: "logOut" });
  };
  return (
    <>
      <Navigation />
      <div className={styles.board}>
        <Link
          to="/game/personal-cards"
          className={styles.boardButton}
          type="button"
        >
          Personal Cards
        </Link>
        <Link to="/game/general-cards" className={styles.boardButton}>
          General Cards
        </Link>
        <Button onClick={handleClickLogOut}>Log Out</Button>
      </div>
    </>
  );
}
