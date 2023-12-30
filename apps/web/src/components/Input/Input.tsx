import React, { ForwardedRef } from "react";
import styles from "./Input.module.scss";
export const Input = React.forwardRef(
  (
    {
      label,
      labelClass,
      ...props
    }: JSX.IntrinsicElements["input"] & {
      readonly label?: string;
      readonly labelClass?: string;
    },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <>
        <label htmlFor={props.name} className={labelClass}>
          {label || props.name}
        </label>
        <input type="text" {...props} ref={ref} className={styles.input} />
      </>
    );
  },
);

Input.displayName = "Input";
