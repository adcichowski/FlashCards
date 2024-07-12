//
export const convertDate = (seconds: number) => {
  const miniseconds = seconds * 1000;
  const dateFormat = new Intl.DateTimeFormat(undefined, { year: "numeric", month: "2-digit", day: "2-digit" }).format(
    miniseconds,
  );
  return dateFormat;
};
