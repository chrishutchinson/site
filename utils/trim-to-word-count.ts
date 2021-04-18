export const trimToWordCount = (str: string, count: number): string => {
  return `${str.split(" ").slice(0, count).join(" ").trim()}...`;
};
