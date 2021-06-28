import Navigation from "../../../Navigation/Navigation";
import General from "./General/General";
import Personal from "./Personal/Personal";
import styles from "./Board.module.scss";
import Button from "../../../Button/Button";
import { useState } from "react";
import { useFuncAuthFirebase } from "../../../../lib/firebase/Hooks";

export default function Board() {
  const [nameBoard, setBoard] = useState<string>("");
  const { logOut } = useFuncAuthFirebase();
  const handleClick = (board: string) => {
    setBoard(board);
  };
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
            <Button text="Log Out" onClickAction={() => logOut()} />
          </div>
        </>
      );
  }
}
