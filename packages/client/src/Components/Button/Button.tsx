import { ButtonSize } from "../../Types/Types";
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
  const buttonClass = !secondary ? styles.button : styles.buttonSecondary;
  return (
    <button className={`${buttonClass} ${stylesButton.parent}  `} {...props}>
      <span className={`${styles.front} ${stylesButton.children} ${clsx(secondary && styles.frontSecondary)}`}>
        {children}
      </span>
    </button>
  );
}
export { Button };
