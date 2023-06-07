import React, { ForwardedRef } from "react";
import styles from "./Textarea.module.scss";
export const Textarea = React.forwardRef(
  (
    {
      label,
      labelClass,
      ...props
    }: JSX.IntrinsicElements["textarea"] & {
      readonly label: string;
      readonly labelClass?: string;
    },
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    return (
      <>
        <label htmlFor={props.name} className={labelClass}>
          {label}
        </label>
        <textarea maxLength={255} {...props} ref={ref} className={styles.textarea} />
      </>
    );
  },
);

Textarea.displayName = "Textarea";
