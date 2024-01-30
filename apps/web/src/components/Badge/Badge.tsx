import React from "react";
import styles from "./Badge.module.scss";
import clsx from "clsx";

export default function Badge({
  children,
  variant,
  color,
}: {
  children: string | number | JSX.Element;
  variant?: "outline";
  color?: string;
}) {
  return (
    <div style={{ backgroundColor: color }} className={clsx(styles.badge, variant && styles[variant])}>
      <div className={styles.text}>{children}</div>
    </div>
  );
}
