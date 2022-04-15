import { Navigation } from "../../../Navigation/Navigation";
import styles from "./MainBoard.module.scss";

function MainBoard() {
  // const { data, isLoading } = useQuery("repoData", () =>
  //   axios.get("http://localhost:3001/subjects", { method: "GET" }).then((res) => res.data),
  // );

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
