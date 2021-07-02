import Navigation from "../../../Navigation/Navigation";
import General from "./General/General";
import Personal from "./Personal/Personal";
import styles from "./Board.module.scss";
import Button from "../../../Button/Button";
import { useState } from "react";

import { useAuthContext } from "../../../../Context/AuthContext";
import { useHistory } from "react-router";

export default function Board() {
  const history = useHistory();
  const { state, dispatch } = useAuthContext();
  const [nameBoard, setBoard] = useState<string>("");
  const handleClickLogOut = () => {
    dispatch({ type: "logOut" });
  };
  const handleClick = (board: string) => {
    setBoard(board);
  };
  if (!state.isLogin) history.replace("/login");
  switch (nameBoard) {
    case "Personal":
      return <Personal />;
    case "General":
      return <General />;
    default:
      return (
        <>
          <Navigation />
          <div className={styles.board}>
            <button
              className={styles.boardButton}
              type="button"
              onClick={() => handleClick("Personal")}
            >
              Personal Cards
            </button>
            <button
              className={styles.boardButton}
              onClick={() => setBoard("General")}
            >
              General Cards
            </button>
            <Button onClick={handleClickLogOut}>Log Out</Button>
          </div>
        </>
      );
  }
}
