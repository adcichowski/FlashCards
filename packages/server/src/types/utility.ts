export type InferPromise<
  T extends (...args: any) => Promise<any>,
  R = ReturnType<T>
> = R extends Promise<infer Value>
  ? Value extends readonly unknown[]
    ? Value[0]
    : Value
  : never;
