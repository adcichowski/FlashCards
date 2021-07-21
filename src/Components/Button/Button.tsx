import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  width?: string;
  height?: string;
  fontSize?: string;
  link?: string;
  maxWidth?: string;
  maxHeight?: string;
}
export default function Button({
  link,
  children,
  onClick,
  width,
  height,
  fontSize,
  maxWidth = "20rem",
  maxHeight = "10rem",
}: ButtonProps) {
  if (link) {
    return (
      <Link
        to={`/${link}`}
        className={styles.button}
        style={{
          width,
          height,
          maxWidth,
          maxHeight,
        }}
      >
        <span style={{ fontSize }} className={styles.front}>
          {children}
        </span>
      </Link>
    );
  }
  return (
    <button
      style={{
        width,
        height,
        maxWidth,
        maxHeight,
      }}
      onClick={onClick}
      className={styles.button}
    >
      <span style={{ fontSize }} className={styles.front}>
        {children}
      </span>
    </button>
  );
}
