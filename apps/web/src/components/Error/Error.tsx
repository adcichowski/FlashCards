import React from "react";
import styles from "./Error.module.scss";
import { GhostIcon } from "lucide-react";
export default function Error({ error, code = 404 }: { error: string; code?: number }) {
  return (
    <section role="status" className={styles.errorWrapper}>
      <div className={styles.iconWrapper}>
        <GhostIcon aria-hidden={true} className={styles.icon} />
      </div>
      <section className={styles.textWrapper}>
        <h2>Status Code {code}</h2>
        <span>{error}</span>
      </section>
    </section>
  );
}
