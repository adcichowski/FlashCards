import { LoaderCircleIcon } from "lucide-react";
import styles from "./Loading.module.scss";

export const Loading = () => {
  return (
    <div role="status" className={styles.wrapper}>
      <LoaderCircleIcon className={styles.icon} aria-hidden="true" />
      <span>Loading</span>
    </div>
  );
};
