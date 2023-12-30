import Image from "next/image";
import styles from "./BackgroundGame.module.scss";

function BackgroundGame({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className={styles.game}>
      <Image draggable="false" src={"/gameBackground.png"} fill tabIndex={-1} alt="" className={styles.background} />
      {children}
    </div>
  );
}
export { BackgroundGame };
