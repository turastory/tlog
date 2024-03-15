export function countBy<T>(
  arr: T[],
  key: (item: T) => string
): Record<string, number> {
  return arr.reduce(
    (acc, item) => {
      const k = key(item);
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
}
