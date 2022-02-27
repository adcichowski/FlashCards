import styles from "./Game.module.scss";

function Game({ children }: { readonly children: React.PropsWithChildren<{}> }) {
  return (
    <div className={styles.game}>
      <picture tabIndex={-1}>
        <source srcSet="/GameBackground/large.png" media="(min-width: 1080px)" />
        <source srcSet="/GameBackground/medium.png" media="(min-width: 480px)" />
        <source srcSet="/GameBackground/small.png" />
        <img alt="background" className={styles.background} />
      </picture>
      {children}
    </div>
  );
}
export { Game };
Game.displayName = "Game";
