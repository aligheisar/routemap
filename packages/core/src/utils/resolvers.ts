const resolveTitle = <T extends string>(
  value: string | Record<T, string> | undefined,
  context: T,
): string => {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[context];
};

const resolveOrder = <T extends string>(
  value: number | Record<T, number> | undefined,
  context: T,
): number => {
  if (value == null) return 0;
  if (typeof value === "number") return value;
  return value[context];
};

export { resolveTitle, resolveOrder };
