import React from "react";
import { Path, UseFormRegister } from "react-hook-form";

export function Input<T>({
  label,
  labelClass,
  register,
  ...props
}: JSX.IntrinsicElements["input"] & {
  readonly label: Path<T>;
  readonly labelClass?: string;
  readonly register: UseFormRegister<T>;
}) {
  return (
    <>
      <label className={labelClass}>
        {label}
        <input type="text" {...register(label)} {...props} />
      </label>
    </>
  );
}
