import React, { ForwardedRef } from "react";
import styles from "./Input.module.scss";
import clsx from "clsx";
export const Input = React.forwardRef(
  (
    {
      label,
      error,
      oneLine,
      ...props
    }: JSX.IntrinsicElements["input"] & {
      readonly oneLine?: boolean;
      readonly label?: string;
      readonly error?: string;
    },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <>
        <label htmlFor={props.name} className={clsx(styles.label, oneLine && styles.oneLine)}>
          <span>{label || props.name}</span>
          <input type="text" {...props} ref={ref} className={styles.input} />
        </label>
        <p className={styles.errorInfo}>{error || ""}</p>
      </>
    );
  },
);

Input.displayName = "Input";
