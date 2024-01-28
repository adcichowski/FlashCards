import React from "react";
import styles from "./Badge.module.scss";
export default function Badge({ value }: { value: string | number }) {
  return <div className={styles.badge}>{value}</div>;
}
