import React from "react";
import styles from "./Badge.module.scss";
import clsx from "clsx";

export default function Badge({ children, variant }: { children: string | number | JSX.Element; variant?: "outline" }) {
  return (
    <div className={clsx(styles.badge, variant && styles[variant])}>
      <div className={styles.text}>{children}</div>
    </div>
  );
}
