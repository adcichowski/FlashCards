import Link from "next/link";
import React from "react";
import styles from "./Archon.module.scss";
export default function Archon({
  size,
  ...props
}: JSX.IntrinsicElements["a"] & { readonly size: "big" | "small" | "normal" }) {
  const stylesButton = {
    parent: styles[`${size}Button`],
    children: styles[`${size}Front`],
  };
  return (
    <Link href={`/${props.href}`} className={`${styles.button} ${stylesButton.parent}`}>
      <span className={`${styles.front} ${stylesButton.children}`}>{props.children}</span>
    </Link>
  );
}
