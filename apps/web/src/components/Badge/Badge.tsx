import React from "react";
import styles from "./Badge.module.scss";
import clsx from "clsx";
import NotFoundIcon from "public/icons/technology/not-found.svg";
import { techs } from "./constants/techs";

export default function Badge({
  children,
  variant,
  name,
}: {
  name: string;
  children: string | number | JSX.Element;
  variant?: "outline";
}) {
  const Tech = techs[name as keyof typeof techs];

  return (
    <div className={clsx(styles.badge, variant && styles[variant])}>
      <div className={styles.icon}>{Tech ? <Tech.Icon /> : <NotFoundIcon />}</div>
      <div className={styles.text}>{children}</div>
    </div>
  );
}
