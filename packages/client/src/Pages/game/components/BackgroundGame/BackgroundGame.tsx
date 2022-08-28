import Image from "next/image";
import styles from "./BackgroundGame.module.scss";

function BackgroundGame({ children }: { readonly children: React.PropsWithChildren<{}> }) {
  return (
    <div className={styles.game}>
      <Image src={"/GameBackground/large.png"} layout="fill" tabIndex={-1} alt="" className={styles.background} />
      {children}
    </div>
  );
}
export { BackgroundGame };
