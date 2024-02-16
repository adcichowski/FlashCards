import React, { ForwardedRef } from "react";
import styles from "./Input.module.scss";
export const Input = React.forwardRef(
  (
    {
      label,
      error,
      ...props
    }: JSX.IntrinsicElements["input"] & {
      readonly label?: string;
      readonly error?: string;
    },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <>
        <label htmlFor={props.name} className={styles.label}>
          <span>{label || props.name}</span>
          <input type="text" {...props} ref={ref} className={styles.input} />
        </label>
        <p className={styles.errorInfo}>{error || ""}</p>
      </>
    );
  },
);

Input.displayName = "Input";
