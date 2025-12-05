const resolveTitle = <T extends string>(
  value: string | Record<T, string>,
  context: T,
): string => {
  if (typeof value === "string") return value;
  return value[context];
};

const resolveOrder = <T extends string>(
  value: number | Record<T, number>,
  context: T,
): number => {
  if (typeof value === "number") return value;
  return value[context];
};

export { resolveTitle, resolveOrder };
