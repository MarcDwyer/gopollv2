export const getOptions = (count: number) =>
  Array(count)
    .join(".")
    .split(".");
