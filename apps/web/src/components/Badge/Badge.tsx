import React from "react";
import styles from "./Badge.module.scss";
import clsx from "clsx";


export default function Badge({ value, variant }: { value: string | number, variant?:'outline' }) {
  return (
    <div className={clsx(styles.badge, variant && styles[variant])}>
      <span className={styles.text}>{value}</span>
    </div>
  );
}
