import Image from "next/image";
import styles from "./BackgroundBoard.module.scss";

function BackgroundBoard({ children }: { readonly children: React.ReactNode }) {
  return (
    <>
      <Image draggable="false" src={"/gameBackground.png"} fill tabIndex={-1} alt="" className={styles.background} />
      <div className={styles.wrapper}>{children}</div>
    </>
  );
}
export { BackgroundBoard };
