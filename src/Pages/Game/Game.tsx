import styles from "./Game.module.scss";

function Game({ children }: { children: React.PropsWithChildren<{}> }) {
  return <section className={styles.game}>{children}</section>;
}
export { Game };
Game.displayName = "Game";
