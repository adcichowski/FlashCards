import React from "react";

export function Input({
  labelText,
  labelClass,
  ...props
}: JSX.IntrinsicElements["input"] & {
  readonly labelText: string;
  readonly labelClass?: string;
}) {
  return (
    <>
      <label className={labelClass}>
        {labelText}
        <input type="text" {...props} />
      </label>
    </>
  );
}
