import { Navigation } from "../../../Navigation/Navigation";
import styles from "./MainBoard.module.scss";
import Link from "next/link";
import Plus from "../../../../Assets/Icons/plus.svg";
import { Button } from "../../../Button/Button";
import { useQuery } from "react-query";
import axios from "axios";

function MainBoard() {
  const { data, isLoading } = useQuery("repoData", () =>
    axios.get("http://localhost:3001/subjects", { method: "GET" }).then((res) => res.data),
  );

  return (
    <>
      <Navigation />
      <div className={styles.board}>
        <div className={styles.insideBoard}>
          <div className={styles.boardTitle}>
            <h1>Avaible Subjects</h1>
          </div>
        </div>
      </div>
    </>
  );
}
export { MainBoard };
MainBoard.displayName = "MainBoard";
