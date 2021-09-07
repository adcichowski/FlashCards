import styles from "./Game.module.scss";

function Game({ children }: { children: React.PropsWithChildren<{}> }) {
  return (
    <section className={styles.game}>
      <picture tabIndex={-1}>
        <source
          srcSet="/GameBackground/large.png"
          media="(min-width: 1080px)"
        />
        <source
          srcSet="/GameBackground/medium.png"
          media="(min-width: 480px)"
        />
        <source
          srcSet="/GameBackground/small.png"
          media="(max-width: 360px), (min-width:360px)"
        />
        <img alt="background" className={styles.background} />
      </picture>
      {children}
    </section>
  );
}
export { Game };
Game.displayName = "Game";
