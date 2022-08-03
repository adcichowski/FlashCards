import { ButtonSize } from "../../types/types";
import styles from "./Button.module.scss";
import clsx from "clsx";

function Button({
  children,
  size,
  secondary,
  ...props
}: JSX.IntrinsicElements["button"] & { readonly size: ButtonSize; readonly secondary?: boolean }) {
  const stylesButton = {
    parent: styles[`${size}Button`],
    children: styles[`${size}Front`],
  };
  const classToSet = !secondary ? styles.button : styles.buttonSecondary;
  return (
    <button className={`${classToSet} ${stylesButton.parent}  `} {...props}>
      <span className={`${styles.front} ${stylesButton.children} ${clsx(secondary && styles.frontSecondary)}`}>
        {children}
      </span>
    </button>
  );
}
export { Button };
